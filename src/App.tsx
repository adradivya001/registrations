import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import RegistrationForm from './components/RegistrationForm';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.setAttribute('data-visible', 'true');
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
      a: "The lottery draw will be conducted on June 25. If your application is selected, our team will contact you through your registered phone number."
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

  const openRegistrationForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  return (
    <>
      <nav id="main-nav" className={isScrolled ? 'scrolled' : ''}>
        <a className="nav-logo" href="#">
          <img src="/janmasethu.png" alt="JanmaSethu Logo" style={{ height: '90px', width: 'auto', transform: 'scale(2.8)', transformOrigin: 'left center' }} />
        </a>
        <div className="nav-right">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a href="#why-apply" className="nav-link">Why Us</a>
          <a href="#eligibility" className="nav-link">Who can apply</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>
        <button onClick={openRegistrationForm} className="nav-cta-btn" style={{border: 'none', cursor: 'pointer'}}>Apply Now &rarr;</button>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-blob blob-3"></div>
        <div className="hero-dots"></div>
        
        <div className="hero-inner" style={{gridTemplateColumns: '1fr 1fr'}}>
          <div className="hero-left-content">
            <div className="hero-eyebrow highlight-tag"><i className="ti ti-certificate"></i><span>Grant Program · 2026</span></div>
            <h1 style={{color: 'var(--teal)', textAlign: 'left', marginBottom: '24px'}}>JanmaSethu<br/><span className="italic-word">Fertility</span><br/><span className="gold-word">Grant Program</span></h1>
            <p className="hero-desc" style={{color: 'var(--ink-mid)', textAlign: 'left', marginBottom: '40px'}}>We are supporting 100 couples across Andhra Pradesh &amp; Telangana with fully-funded fertility treatment. No fees. No hidden costs. Just hope.</p>
            <div className="hero-chips" style={{marginBottom: '44px'}}>
              <div className="chip"><i className="ti ti-map-pin"></i> AP &amp; Telangana</div>
              <div className="chip"><i className="ti ti-calendar-event"></i> Apply before June 18</div>
              <div className="chip"><i className="ti ti-trophy"></i> Lottery on June 25</div>
            </div>
            <div className="hero-actions" style={{justifyContent: 'flex-start'}}>
              <button onClick={openRegistrationForm} className="btn-hero" style={{border: 'none', cursor: 'pointer'}}>Apply Now <i className="ti ti-arrow-right"></i></button>
              <a href="#how-it-works" className="btn-ghost" style={{color: 'var(--ink)'}}>How it works</a>
            </div>
          </div>
          <div className="hero-illustration">
            <img src="/hero_illustration.png" alt="Parenthood Journey" style={{width: '100%', height: 'auto', transform: 'scale(1.1)', transformOrigin: 'center'}} />
          </div>
        </div>
        


        <div className="hero-curve">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 64 C360 0 1080 0 1440 64 L1440 64 L0 64Z" fill="var(--gold-wash)"/>
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
            <div 
              className={`why-card reveal reveal-delay-1 ${activeCard === 1 ? 'active' : ''}`}
              onClick={() => setActiveCard(activeCard === 1 ? null : 1)}
            >
              <div className="why-card-icon"><i className="ti ti-coin-off"></i></div>
              <h3>Zero Financial Burden</h3>
              <p>The entire application process is free. We never ask for deposits, processing fees, or any payments from applicants.</p>
            </div>
            <div 
              className={`why-card reveal reveal-delay-2 ${activeCard === 2 ? 'active' : ''}`}
              onClick={() => setActiveCard(activeCard === 2 ? null : 2)}
            >
              <div className="why-card-icon"><i className="ti ti-scale"></i></div>
              <h3>Fair Lottery System</h3>
              <p>Every eligible applicant has an equal chance. Selection is done via a transparent, unbiased lottery — no favoritism.</p>
            </div>
            <div 
              className={`why-card reveal reveal-delay-3 ${activeCard === 3 ? 'active' : ''}`}
              onClick={() => setActiveCard(activeCard === 3 ? null : 3)}
            >
              <div className="why-card-icon"><i className="ti ti-lock"></i></div>
              <h3>Private &amp; Confidential</h3>
              <p>Your medical and financial information is handled with the utmost care. We never share your data with third parties.</p>
            </div>
            <div 
              className={`why-card reveal reveal-delay-4 ${activeCard === 4 ? 'active' : ''}`}
              onClick={() => setActiveCard(activeCard === 4 ? null : 4)}
            >
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
            <p className="section-sub">This grant is for couples in Andhra Pradesh and Telangana who need fertility support but face financial constraints.</p>
          </div>
          <div className="eligibility-grid">
            <div className="elig-list reveal">
              <div className="elig-item">
                <i className="ti ti-map-pin"></i>
                <div className="elig-item-text"><strong>Andhra Pradesh &amp; Telangana Residents</strong><span>Applicants must currently reside in Andhra Pradesh or Telangana and provide valid proof of residency.</span></div>
              </div>
              <div className="elig-item">
                <i className="ti ti-user-check"></i>
                <div className="elig-item-text"><strong>Female Partner Age 20–50</strong><span>The female partner must be between 20 and 50 years of age.</span></div>
              </div>
              <div className="elig-item">
                <i className="ti ti-stethoscope"></i>
                <div className="elig-item-text"><strong>Diagnosed Fertility Condition</strong><span>Applicants should have a confirmed fertility diagnosis or a doctor's recommendation for IUI/IVF treatment.</span></div>
              </div>
              <div className="elig-item">
                <i className="ti ti-wallet"></i>
                <div className="elig-item-text"><strong>Financial Need</strong><span>Priority is given to couples facing financial challenges that have delayed treatment.</span></div>
              </div>
              <div className="elig-item">
                <i className="ti ti-clock"></i>
                <div className="elig-item-text"><strong>Ready to Start Treatment</strong><span>Applicants should be ready to begin treatment within the next 90 days.</span></div>
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

      {isFormOpen && (
        <RegistrationForm onClose={() => setIsFormOpen(false)} />
      )}

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
          <button onClick={openRegistrationForm} className="btn-cta-main" style={{border: 'none', cursor: 'pointer'}}>Start Your Application <i className="ti ti-arrow-right"></i></button>
          <p className="cta-note"><i className="ti ti-shield-check"></i> Free to apply · No fees at any stage · Secure &amp; confidential</p>
        </div>
      </section>

      <footer className="footer-new">
        <div className="footer-inner-new">
          <div className="footer-left">
            <div className="footer-brand-wrap">
              <img src="/janmasethu.png" alt="JanmaSethu Logo" style={{ height: '90px', width: 'auto', transform: 'scale(2.8)', transformOrigin: 'left center' }} />
            </div>
          </div>
          <div className="footer-center">
            <a href="#" className="footer-link-minimal">Privacy Policy</a>
            <a href="#" className="footer-link-minimal">Terms of Service</a>
            <a href="#" className="footer-link-minimal">Cookies</a>
          </div>
          <div className="footer-right">
            <p className="footer-copyright-minimal">© 2026 JanmaSethu Fertility Grant Program. Built for the future of care.</p>
            <button 
              className="scroll-top-btn" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              <i className="ti ti-chevron-up"></i>
            </button>
          </div>
        </div>
      </footer>

    </>
  );
}
