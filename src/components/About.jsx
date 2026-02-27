import React from 'react';

const About = () => {
    return (
        <section id="about" className="section reveal-wrapper">
            <h2 className="section-title">01. Initialization</h2>

            <div className="about-grid">
                <div className="about-text glass-panel">
                    <p>
                        I am a dedicated software engineer with a Master of Computer Applications degree. My core processing thread is focused on developing highly scalable backend systems and robust enterprise integrations.
                    </p>
                    <p>
                        With expertise spanning across <strong>Oracle Integration Cloud</strong>, Java, and modern web architectures, I strive to write strict, maintainable, and highly optimized code that powers complex digital ecosystems.
                    </p>
                </div>

                <div className="timeline glass-panel">
                    <div className="timeline-item">
                        <div className="timeline-year">2025</div>
                        <div className="timeline-title">Master of Computer Applications</div>
                        <div className="timeline-org">Vignan University (CGPA: 7.33)</div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-year">2023</div>
                        <div className="timeline-title">Bachelor of Computer Applications</div>
                        <div className="timeline-org">ASN Degree College (CGPA: 8.38)</div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-year">2020</div>
                        <div className="timeline-title">Intermediate</div>
                        <div className="timeline-org">Guru’s Junior College</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;


