import React from 'react';

const Hero = () => {
    return (
        <section className="hero reveal-wrapper" id="home">
            <div className="hero-content">
                <div className="hero-text-area">
                    <p className="hero-subtitle"></p>
                    <h1 className="flicker">Tamma Nived Reddy</h1>
                    <p>
                        Software Engineer specializing in Oracle Integration Cloud, robust backend architecture, and building scalable fault-tolerant enterprise solutions.
                    </p>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn btn-primary">Initialize Work</a>
                        <a href="#contact" className="btn btn-outline">Establish Connection</a>
                    </div>
                </div>
                <div className="hero-image-area">
                    <div className="hero-image-container glass-panel">
                        <img src="/hero_profile.png" alt="Tamma Nived Reddy Cyber Profile" className="hero-profile-img" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
