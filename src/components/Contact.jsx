import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('transmitting');

        try {
            const response = await fetch("https://formsubmit.co/ajax/nivedreddy6@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: "New Transmission from Portfolio!",
                    ...formData
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                // Reset success message after 5 seconds
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
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

                <div className="contact-form-column glass-panel">
                    <h3>Send Message</h3>
                    <form className="cyber-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" id="name" required placeholder=" " value={formData.name} onChange={handleChange} disabled={status === 'transmitting'} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" required placeholder=" " value={formData.email} onChange={handleChange} disabled={status === 'transmitting'} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-group">
                            <textarea id="message" required placeholder=" " rows="4" value={formData.message} onChange={handleChange} disabled={status === 'transmitting'}></textarea>
                            <label htmlFor="message">Message</label>
                        </div>

                        {status === 'success' && (
                            <div style={{ color: 'var(--accent-cyan)', padding: '10px', borderLeft: '3px solid var(--accent-cyan)', background: 'rgba(0, 240, 255, 0.1)', marginBottom: '10px' }}>
                                Message successfully sent! I will get back to you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div style={{ color: '#ff4d4f', padding: '10px', borderLeft: '3px solid #ff4d4f', background: 'rgba(255, 77, 79, 0.1)', marginBottom: '10px' }}>
                                Message failed to send. Please try again or email directly.
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={status === 'transmitting'}>
                            {status === 'transmitting' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
