import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface RegistrationFormProps {
  onClose: () => void;
}

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    age_female_partner: '',
    current_city: '',
    whatsapp_number: '',
    duration_trying: 'Less than 1 year',
    consulted_doctor: 'false',
    desired_treatment: 'IUI',
    previous_treatments: 'None',
    monthly_income: 'Below ₹25,000',
    occupation: 'Husband employed',
    has_insurance: 'false',
    financial_constraints_delayed_treatment: 'false',
    grant_importance_story: '',
    ready_in_3_months: 'false',
    aadhaar_number: '',
    terms_accepted: false,
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.terms_accepted) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setIsSubmitting(true);

    try {
      if (!file) {
        throw new Error('Please upload your fertility report');
      }

      // Upload file
      const bucketName = 'fertility-reports';
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `${timestamp}-${randomStr}.${fileExt}`;
      const filePath = `reports/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('fertility-reports')
        .getPublicUrl(filePath);

      const reportUrl = publicUrlData.publicUrl;

      // Insert data
      const insertData = {
        full_name: formData.full_name,
        age_female_partner: parseInt(formData.age_female_partner),
        current_city: formData.current_city,
        whatsapp_number: formData.whatsapp_number,
        duration_trying: formData.duration_trying,
        consulted_doctor: formData.consulted_doctor === 'true',
        desired_treatment: formData.desired_treatment,
        previous_treatments: formData.previous_treatments,
        fertility_report_url: reportUrl,
        monthly_income: formData.monthly_income,
        occupation: formData.occupation,
        has_insurance: formData.has_insurance === 'true',
        financial_constraints_delayed_treatment: formData.financial_constraints_delayed_treatment === 'true',
        grant_importance_story: formData.grant_importance_story,
        ready_in_3_months: formData.ready_in_3_months === 'true',
        aadhaar_number: formData.aadhaar_number || null,
        terms_accepted: formData.terms_accepted,
      };

      const { error: insertError } = await supabase
        .from('applications')
        .insert([insertData]);

      if (insertError) throw insertError;

      setSuccess(true);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="modal-overlay">
        <div className="modal-content success-content">
          <div className="success-icon success-icon-green"><i className="ti ti-check"></i></div>
          <h2>Application Submitted Successfully</h2>
          <p className="success-thankyou">Thank you for choosing us!!</p>
          <p>Thank you for applying to the JanmaSethu Fertility Grant Program. Our team will review all applications. If shortlisted, you will be contacted after June 25.</p>
          <button onClick={onClose} className="btn-cta-main" style={{marginTop: '24px'}}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Application Form 2026</h2>
          <button onClick={onClose} className="close-btn"><i className="ti ti-x"></i></button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="application-form">
          {/* Section 1 */}
          <div className="form-section">
            <h3>1. Basic Details</h3>
            
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Age (Female Partner) *</label>
                <input type="number" name="age_female_partner" min="20" max="50" required value={formData.age_female_partner} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Current City *</label>
                <input type="text" name="current_city" required value={formData.current_city} onChange={handleChange} />
              </div>
            </div>
            
            <div className="form-group">
              <label>WhatsApp Number *</label>
              <input type="text" name="whatsapp_number" pattern="^\d{10}$" title="Enter a valid 10-digit mobile number" required value={formData.whatsapp_number} onChange={handleChange} />
            </div>
          </div>

          {/* Section 2 */}
          <div className="form-section">
            <h3>2. Medical Information</h3>
            
            <div className="form-group">
              <label>How long have you been trying to conceive? *</label>
              <select name="duration_trying" value={formData.duration_trying} onChange={handleChange} required>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1 – 3 years">1 – 3 years</option>
                <option value="3 – 5 years">3 – 5 years</option>
                <option value="More than 5 years">More than 5 years</option>
              </select>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Consulted a fertility doctor before? *</label>
                <select name="consulted_doctor" value={formData.consulted_doctor} onChange={handleChange} required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>Desired Treatment *</label>
                <select name="desired_treatment" value={formData.desired_treatment} onChange={handleChange} required>
                  <option value="IUI">IUI</option>
                  <option value="IVF">IVF</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Previous Treatments</label>
              <select name="previous_treatments" value={formData.previous_treatments} onChange={handleChange}>
                <option value="None">None</option>
                <option value="IUI">IUI</option>
                <option value="IVF">IVF</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div className="form-group">
              <label>Upload your latest fertility report (PDF/Image, max 10MB) *</label>
              <input type="file" accept=".pdf,image/jpeg,image/png" required onChange={handleFileChange} />
            </div>
          </div>

          {/* Section 3 */}
          <div className="form-section">
            <h3>3. Financial Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Monthly Household Income *</label>
                <select name="monthly_income" value={formData.monthly_income} onChange={handleChange} required>
                  <option value="Below ₹25,000">Below ₹25,000</option>
                  <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                  <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                  <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                </select>
              </div>
              <div className="form-group">
                <label>Occupation *</label>
                <select name="occupation" value={formData.occupation} onChange={handleChange} required>
                  <option value="Husband employed">Husband employed</option>
                  <option value="Wife employed">Wife employed</option>
                  <option value="Both employed">Both employed</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Do you have insurance covering fertility treatment? *</label>
                <select name="has_insurance" value={formData.has_insurance} onChange={handleChange} required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>Have financial constraints delayed your treatment? *</label>
                <select name="financial_constraints_delayed_treatment" value={formData.financial_constraints_delayed_treatment} onChange={handleChange} required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="form-section">
            <h3>4. Your Personal Story</h3>
            <div className="form-group">
              <label>Why is this grant important for your family? (100-200 words) *</label>
              <textarea name="grant_importance_story" rows={4} required value={formData.grant_importance_story} onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Section 5 */}
          <div className="form-section">
            <h3>5. Final Confirmation</h3>
            <div className="form-group">
              <label>Are you ready to start treatment within 3 months if selected? *</label>
              <select name="ready_in_3_months" value={formData.ready_in_3_months} onChange={handleChange} required>
                <option value="true">Yes, I am ready</option>
                <option value="false">No</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Aadhaar Number (Optional)</label>
              <input type="text" name="aadhaar_number" value={formData.aadhaar_number} onChange={handleChange} />
            </div>

            <div className={`form-group checkbox-group${termsError ? ' terms-error' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  name="terms_accepted"
                  checked={formData.terms_accepted}
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.checked) setTermsError(false);
                  }}
                />
                I agree to the Terms &amp; Conditions and Privacy Policy and consent to my data being used for grant verification purposes. *
              </label>
              {termsError && (
                <p className="terms-error-msg">⚠️ Please agree to the Terms &amp; Conditions before submitting.</p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-cta-main" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
