import { useEffect, useState } from 'react';
import './index.css';
import RegistrationForm from './components/RegistrationForm';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Is this really free? No hidden charges?",
      a: "Yes, completely free. JanmaSethu does not charge applicants any fees at any stage — not for applying, not after selection, and not during treatment. Any treatment costs are paid directly from JanmaSethu to the partner clinic on your behalf."
    },
    {
      q: "How are the 100 couples selected?",
      a: "After the application deadline on June 18, our team reviews all applications for basic eligibility. Eligible applicants then enter a fair lottery draw held on June 25. All eligible applicants have an equal chance of selection."
    },
    {
      q: "What documents do I need to apply?",
      a: "You will need to upload your latest fertility report (PDF, JPG or PNG, max 10MB). Aadhaar number is optional at the time of application — it may be requested later during the verification process if you are selected."
    },
    {
      q: "When will I know if I've been selected?",
      a: "The lottery takes place on June 25. If you are selected, our team will contact you directly on your registered WhatsApp number before June 25. Please ensure your number is active and correct."
    },
    {
      q: "Can I apply if I've had previous fertility treatment?",
      a: "Yes. Previous IUI or IVF attempts do not disqualify you. In fact, having prior treatment history and medical records strengthens your application as it demonstrates an established fertility need."
    },
    {
      q: "Someone asked me to pay to secure my application. What do I do?",
      a: "Do NOT pay anyone. JanmaSethu never asks applicants for money at any stage. If someone contacts you claiming to be from JanmaSethu and requests payment, this is a scam. Report it to us immediately on our official contact channel."
    }
  ];

  return (
    <>
      <nav id="main-nav" className={isScrolled ? 'scrolled' : ''}>
        <a className="nav-logo" href="#">
          <img src="/janmasethu.png" alt="JanmaSethu Logo" style={{ height: '60px', width: 'auto', transform: 'scale(2.5)', transformOrigin: 'left center' }} />
        </a>
        <div className="nav-right">
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a href="#why-apply" className="nav-link">Why apply</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <button onClick={() => setIsFormOpen(true)} className="nav-cta-btn" style={{border: 'none', cursor: 'pointer'}}>Apply Now &rarr;</button>
        </div>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-blob blob-3"></div>
        <div className="hero-dots"></div>
        
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow"><i className="ti ti-certificate"></i><span>Grant Program · 2025</span></div>
            <h1>JanmaSethu<br/><span className="italic-word">Fertility</span><br/><span className="gold-word">Grant Program</span></h1>
            <p className="hero-desc">We are supporting 100 couples across Andhra Pradesh with fully-funded fertility treatment. No fees. No hidden costs. Just hope.</p>
            <div className="hero-chips">
              <div className="chip"><i className="ti ti-map-pin"></i> Andhra Pradesh</div>
              <div className="chip"><i className="ti ti-calendar-event"></i> Apply before June 18</div>
              <div className="chip"><i className="ti ti-trophy"></i> Lottery on June 25</div>
            </div>
            <div className="hero-actions">
              <button onClick={() => setIsFormOpen(true)} className="btn-hero" style={{border: 'none', cursor: 'pointer'}}>Apply Now <i className="ti ti-arrow-right"></i></button>
              <a href="#how-it-works" className="btn-ghost"><i className="ti ti-info-circle"></i> How it works</a>
            </div>
          </div>
          <div className="hero-card">
            <p className="hero-card-title">Program at a glance</p>
            <div className="stat-row">
              <div className="stat-box"><span className="stat-box-num">100</span><span className="stat-box-label">Couples Supported</span></div>
              <div className="stat-box"><span className="stat-box-num">₹0</span><span className="stat-box-label">Application Fee</span></div>
            </div>
            <div className="deadline-strip">
              <i className="ti ti-clock-hour-4"></i>
              <div className="deadline-strip-text">
                <p>Application Deadline</p>
                <p>June 18, 2025</p>
              </div>
            </div>
            <p className="lottery-tag"><i className="ti ti-refresh"></i> Final selection via lottery · June 25, 2025</p>
          </div>
        </div>
        
        <div className="hero-curve">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 64 C360 0 1080 0 1440 64 L1440 64 L0 64Z" fill="#FEFAF5"/>
          </svg>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item"><i className="ti ti-shield-check"></i> 100% Free to Apply</div>
          <div className="trust-divider"></div>
          <div className="trust-item"><i className="ti ti-lock"></i> No Fees at Any Stage</div>
          <div className="trust-divider"></div>
          <div className="trust-item"><i className="ti ti-heart-handshake"></i> Payments Go Directly to Clinics</div>
          <div className="trust-divider"></div>
          <div className="trust-item"><i className="ti ti-users"></i> Open to All AP Residents</div>
        </div>
      </div>

      <section className="how-section" id="how-it-works">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><span>The Process</span></div>
            <h2 className="section-title">How it <em>Works</em></h2>
            <p className="section-sub">Four simple steps from application to treatment — transparent, fair, and completely free.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card reveal reveal-delay-1">
              <div className="step-num-wrap" data-n="1"><i className="ti ti-file-text"></i></div>
              <h3>Apply Online</h3>
              <p>Fill out our simple Google Form with your basic details, medical info, and personal story. Takes under 10 minutes.</p>
            </div>
            <div className="step-card reveal reveal-delay-2">
              <div className="step-num-wrap" data-n="2"><i className="ti ti-search"></i></div>
              <h3>Application Review</h3>
              <p>Our team reviews every application carefully to ensure eligibility. All information is kept strictly confidential.</p>
            </div>
            <div className="step-card reveal reveal-delay-3">
              <div className="step-num-wrap" data-n="3"><i className="ti ti-trophy"></i></div>
              <h3>Lottery Selection</h3>
              <p>100 couples are selected via a fair, transparent lottery on June 25. Selected applicants are notified directly.</p>
            </div>
            <div className="step-card reveal reveal-delay-4">
              <div className="step-num-wrap" data-n="4"><i className="ti ti-building-hospital"></i></div>
              <h3>Treatment Begins</h3>
              <p>JanmaSethu pays the clinic directly. You focus entirely on your treatment — no financial burden at any point.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section" id="why-apply">
        <div className="why-bg-text">Hope</div>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><span>Why Choose Us</span></div>
            <h2 className="section-title">Designed with <em>dignity</em><br/>for every couple</h2>
            <p className="section-sub">We believe financial barriers should never stand between a family and their dream of parenthood.</p>
          </div>
          <div className="why-grid">
            <div className="why-card reveal reveal-delay-1">
              <div className="why-card-icon"><i className="ti ti-coin-off"></i></div>
              <h3>Zero Financial Burden</h3>
              <p>The entire application process is free. We never ask for deposits, processing fees, or any payments from applicants.</p>
            </div>
            <div className="why-card reveal reveal-delay-2">
              <div className="why-card-icon"><i className="ti ti-scale"></i></div>
              <h3>Fair Lottery System</h3>
              <p>Every eligible applicant has an equal chance. Selection is done via a transparent, unbiased lottery — no favoritism.</p>
            </div>
            <div className="why-card reveal reveal-delay-3">
              <div className="why-card-icon"><i className="ti ti-lock"></i></div>
              <h3>Private & Confidential</h3>
              <p>Your medical and financial information is handled with the utmost care. We never share your data with third parties.</p>
            </div>
            <div className="why-card reveal reveal-delay-4">
              <div className="why-card-icon"><i className="ti ti-building-hospital"></i></div>
              <h3>Clinic-Direct Payments</h3>
              <p>Grant funds go straight to your treatment clinic. You never touch the money — ensuring it's used entirely for your care.</p>
            </div>
            <div className="why-card why-highlight reveal">
              <div className="why-highlight-icon"><i className="ti ti-shield-check"></i></div>
              <p><strong>Important safety note:</strong> JanmaSethu does not charge any fees at any stage. If anyone contacts you claiming to be from JanmaSethu and asks for money — <strong>do not pay</strong> and report it to us immediately.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="eligibility-section" id="eligibility">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><span>Eligibility</span></div>
            <h2 className="section-title">Who can <em>apply?</em></h2>
            <p className="section-sub">This grant is for couples in Andhra Pradesh who need fertility support but face financial constraints.</p>
          </div>
          <div className="eligibility-grid">
            <div className="elig-list reveal">
              <div className="elig-item">
                <i className="ti ti-map-pin"></i>
                <div className="elig-item-text"><strong>Andhra Pradesh Residents</strong><span>Couple must currently reside in Andhra Pradesh</span></div>
              </div>
              <div className="elig-item">
                <i className="ti ti-user-check"></i>
                <div className="elig-item-text"><strong>Female Partner Age 20–50</strong><span>The female partner must be between 20 and 50 years of age</span></div>
              </div>
              <div className="elig-item">
                <i className="ti ti-stethoscope"></i>
                <div className="elig-item-text"><strong>Diagnosed Fertility Condition</strong><span>Must have a fertility report or medical recommendation for IUI/IVF</span></div>
              </div>
              <div className="elig-item">
                <i className="ti ti-wallet"></i>
                <div className="elig-item-text"><strong>Financial Need</strong><span>Priority given to couples for whom cost has delayed or prevented treatment</span></div>
              </div>
              <div className="elig-item">
                <i className="ti ti-clock"></i>
                <div className="elig-item-text"><strong>Ready to Start Treatment</strong><span>Selected couples must be prepared to begin treatment within 3 months</span></div>
              </div>
            </div>
            <div className="elig-warning-box reveal reveal-delay-2">
              <h3>Treatment Options Covered</h3>
              <div className="warning-list">
                <div className="warning-item"><i className="ti ti-circle-check"></i> IUI (Intrauterine Insemination)</div>
                <div className="warning-item"><i className="ti ti-circle-check"></i> IVF (In Vitro Fertilisation)</div>
                <div className="warning-item"><i className="ti ti-circle-check"></i> Initial diagnostic consultations</div>
                <div className="warning-item"><i className="ti ti-circle-check"></i> Treatment at verified partner clinics</div>
                <div className="warning-item"><i className="ti ti-circle-check"></i> One treatment cycle per selected couple</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><span>FAQ</span></div>
            <h2 className="section-title">Common <em>Questions</em></h2>
          </div>
          <div className="faq-grid">
            <div className="faq-sidebar reveal">
              <p>Have a question not answered here? We're here to help — reach out through WhatsApp or email before the deadline.</p>
              <div className="faq-contact">
                <strong>Need more help?</strong>
                <p>Contact our support team for any questions about eligibility or the application process.</p>
              </div>
            </div>
            <div className="faq-list reveal reveal-delay-2">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => toggleFaq(index)}>
                    {faq.q}<i className="ti ti-plus"></i>
                  </button>
                  <div 
                    className="faq-a" 
                    style={{
                      maxHeight: openFaqIndex === index ? '500px' : '0',
                      paddingBottom: openFaqIndex === index ? '0' : '0' // css handles actual padding in .faq-a-inner
                    }}
                  >
                    <div className="faq-a-inner">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="apply">
        <div className="cta-shape cta-shape-1"></div>
        <div className="cta-shape cta-shape-2"></div>
        <div className="cta-inner reveal">
          <h2>Your family's<br/><em>journey begins here</em></h2>
          <p>Don't let financial barriers stop you. Apply today — it costs nothing and takes less than 10 minutes.</p>
          <div className="cta-deadline-row">
            <div className="cta-dl-item"><strong>June 18</strong><span>Apply by</span></div>
            <div className="cta-dl-sep"></div>
            <div className="cta-dl-item"><strong>June 25</strong><span>Lottery draw</span></div>
            <div className="cta-dl-sep"></div>
            <div className="cta-dl-item"><strong>100</strong><span>Couples selected</span></div>
          </div>
          <button onClick={() => setIsFormOpen(true)} className="btn-cta-main" style={{border: 'none', cursor: 'pointer'}}>Start Your Application <i className="ti ti-arrow-right"></i></button>
          <p className="cta-note"><i className="ti ti-shield-check"></i> Free to apply · No fees at any stage · Secure &amp; confidential</p>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav-logo" style={{display: 'flex', alignItems: 'center', marginBottom: '24px'}}>
                <img src="/janmasethu.png" alt="JanmaSethu Logo" style={{ height: '70px', width: 'auto', transform: 'scale(2.2)', transformOrigin: 'left center' }} />
              </div>
              <p>Supporting couples across Andhra Pradesh on their journey to parenthood — through compassion, not commerce.</p>
            </div>
            <div className="footer-links">
              <h4>Program</h4>
              <a href="#how-it-works">How it Works</a>
              <a href="#eligibility">Eligibility</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-links">
              <h4>Important Dates</h4>
              <a href="#">Applications Open Now</a>
              <a href="#">Deadline: June 18, 2025</a>
              <a href="#">Lottery: June 25, 2025</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 JanmaSethu Fertility Grant Program · Andhra Pradesh</p>
            <div className="footer-warn"><i className="ti ti-alert-triangle"></i> JanmaSethu never charges fees. Do not pay anyone.</div>
          </div>
        </div>
      </footer>

      {isFormOpen && <RegistrationForm onClose={() => setIsFormOpen(false)} />}
    </>
  );
}
