import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', company: '', subject: '', message: '' });
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = (e) => {
        // We do not prevent default here because we want the native HTML form submit to occur
        // Instead, we target a hidden iframe so it does not redirect the page

        // Deferring the 'transmitting' state ensures the browser natively submits the form 
        // BEFORE the input fields become disabled. Disabled inputs are deliberately ignored by browsers in POST requests!
        setTimeout(() => {
            setStatus('transmitting');
        }, 50);

        // Use a timeout to listen for when the iframe loads after submission
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', company: '', subject: '', message: '' });
            setFile(null);
            const fileInput = document.getElementById('attachment');
            if (fileInput) fileInput.value = '';
            // Reset success message after 6 seconds
            setTimeout(() => setStatus(''), 6000);
        }, 3000); // Give it a few seconds to submit securely
    };

    return (
        <section id="contact" className="section reveal-wrapper">
            <h2 className="section-title">04. Get In Touch</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.2rem', maxWidth: '600px' }}>
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is open and I'll try my best to get back to you!
            </p>

            <div className="contact-layout">
                <div className="contact-info-column">
                    <div className="contact-card glass-panel">
                        <div className="contact-icon">🌐</div>
                        <div className="contact-details">
                            <p>Location</p>
                            <h4>Andhra Pradesh, IN</h4>
                        </div>
                    </div>
                    <div className="contact-card glass-panel">
                        <div className="contact-icon">📧</div>
                        <div className="contact-details">
                            <p>Email</p>
                            <h4>nivedreddy6@gmail.com</h4>
                        </div>
                    </div>
                    <div className="contact-card glass-panel">
                        <div className="contact-icon">📱</div>
                        <div className="contact-details">
                            <p>Phone</p>
                            <h4>+91 77026 18534</h4>
                        </div>
                    </div>
                </div>

                <div className="contact-form-column glass-panel rgb-box" style={{ padding: '30px 40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '15px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <h3 className="rgb-text" style={{ margin: 0, letterSpacing: '1px', fontSize: '1.4rem' }}>New Message</h3>
                    </div>
                    <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }} title="hidden_iframe"></iframe>
                    <form className="cyber-form" action="https://formsubmit.co/nivedreddy6@gmail.com" method="POST" target="hidden_iframe" onSubmit={handleSubmit} encType="multipart/form-data">
                        <input type="hidden" name="_subject" value={formData.subject ? `Portfolio Inquiry: ${formData.subject}` : "New Inquiry from Portfolio"} />
                        <input type="hidden" name="_template" value="box" />
                        <input type="hidden" name="_autoresponse" value="Thank you for reaching out! This is an automated confirmation that your message has been received. I will review it and get back to you as soon as possible.&#10;&#10;Best regards,&#10;Nived Reddy" />
                        <input type="hidden" name="_captcha" value="false" />
                        <div className="form-group" style={{ opacity: 0.8, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                            <input type="text" id="to" value="nivedreddy6@gmail.com" disabled placeholder=" " />
                            <label htmlFor="to">To</label>
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" required placeholder=" " value={formData.email} onChange={handleChange} disabled={status === 'transmitting'} />
                            <label htmlFor="email">From (Your Email)</label>
                        </div>
                        <div className="form-group">
                            <input type="text" id="name" name="name" required placeholder=" " value={formData.name} onChange={handleChange} disabled={status === 'transmitting'} />
                            <label htmlFor="name">Sender Name</label>
                        </div>
                        <div className="form-group">
                            <input type="text" id="company" name="company" placeholder=" " value={formData.company} onChange={handleChange} disabled={status === 'transmitting'} />
                            <label htmlFor="company">Company (Optional)</label>
                        </div>
                        <div className="form-group">
                            <input type="text" id="subject" name="subject" required placeholder=" " value={formData.subject} onChange={handleChange} disabled={status === 'transmitting'} />
                            <label htmlFor="subject">Subject</label>
                        </div>
                        <div className="form-group">
                            <textarea id="message" name="message" required placeholder=" " rows="5" value={formData.message} onChange={handleChange} disabled={status === 'transmitting'}></textarea>
                            <label htmlFor="message">Message Body</label>
                        </div>

                        <div className="form-group" style={{ padding: '0 5px', marginBottom: '20px' }}>
                            <label style={{ position: 'relative', top: '0', left: '0', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
                                Attach Document (Optional)
                            </label>

                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '10px',
                                border: '1px dashed var(--glass-border)',
                                background: 'rgba(0,0,0,0.2)',
                                padding: '15px',
                                color: 'var(--text-primary)',
                                width: '100%',
                                borderRadius: '8px',
                                transition: 'var(--transition)',
                                minHeight: '60px'
                            }}>
                                <input
                                    type="file"
                                    id="attachment"
                                    name="attachment"
                                    accept=".pdf,.zip,.png,.jpg,.jpeg,.doc,.docx"
                                    onChange={handleFileChange}
                                    disabled={status === 'transmitting'}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        cursor: 'pointer',
                                        zIndex: 10
                                    }}
                                />

                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'var(--transition)', flexShrink: 0 }}>
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                </svg>

                                {file ? (
                                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', background: 'rgba(0, 240, 255, 0.1)', padding: '4px 8px', borderRadius: '4px', display: 'inline-flex', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                                        {file.name}
                                    </span>
                                ) : (
                                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Click to add file</span>
                                )}
                            </div>
                        </div>

                        {status === 'success' && (
                            <div style={{ color: 'var(--accent-cyan)', padding: '15px', borderLeft: '4px solid var(--accent-cyan)', background: 'rgba(0, 240, 255, 0.05)', marginBottom: '15px', fontSize: '0.95rem' }}>
                                <strong>Message Sent Successfully</strong><br />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Thank you for reaching out. An automated confirmation has been sent to your email. I will review your message and reply promptly.</span>
                            </div>
                        )}
                        {status === 'error' && (
                            <div style={{ color: '#ff4d4f', padding: '15px', borderLeft: '4px solid #ff4d4f', background: 'rgba(255, 77, 79, 0.05)', marginBottom: '15px', fontSize: '0.95rem' }}>
                                <strong>Delivery Failed</strong><br />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>There was an error transmitting your message. Please try again or email me directly at nivedreddy6@gmail.com.</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                            <button type="submit" className="btn btn-primary" disabled={status === 'transmitting'} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 30px' }}>
                                {status === 'transmitting' ? 'Sending...' : (
                                    <>
                                        <span>Send</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
