import { useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page contact-page">
      <div className="page-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="page-title" style={{ justifyContent: 'center' }}>Contact Support</h1>
        <p className="page-subtitle">We're here to help! Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="contact-layout" style={{ display: 'flex', gap: '4rem', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap' }}>
        <div className="contact-info" style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Get in Touch</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Email Us</h3>
                <p style={{ color: 'var(--text-secondary)' }}>support@bibliophile.com</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Call Us</h3>
                <p style={{ color: 'var(--text-secondary)' }}>+1 (800) 123-4567</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Live Chat</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Available 24/7 on our website</p>
              </div>
            </div>
          </div>
          
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Business Hours</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Monday - Friday: 9am - 8pm EST</p>
            <p style={{ color: 'var(--text-secondary)' }}>Weekend: 10am - 6pm EST</p>
          </div>
        </div>

        <div className="contact-form-wrap" style={{ flex: '1.5', minWidth: '320px', backgroundColor: 'var(--surface-color)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
          {submitted ? (
            <div className="success-message" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1rem' }}>Message Sent!</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Thank you for reaching out. Our support team will get back to you within 24 hours.</p>
              <button className="btn btn--primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Send a Message</h2>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" required placeholder="John Doe" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" required placeholder="john@example.com" />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-input" required>
                  <option value="">Select a topic</option>
                  <option value="order">Order Status</option>
                  <option value="returns">Returns & Refunds</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows="5" required placeholder="How can we help you?" style={{ resize: 'vertical', minHeight: '120px' }}></textarea>
              </div>
              
              <button type="submit" className="btn btn--primary btn--full mt-4">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
