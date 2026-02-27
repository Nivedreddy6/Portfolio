import React from 'react';

const Skills = () => {
    const skills = [
        { name: "Oracle Integration Cloud", level: "Senior Tech" },
        { name: "Java System Architecture", level: "Core Logic" },
        { name: "Python Scripting", level: "Automation" },
        { name: "SQL Databasing", level: "Persistence" },
        { name: "JavaScript / React", level: "Frontend" },
        { name: "RESTful Data Pipelines", level: "Integration" }
    ];

    return (
        <section id="skills" className="section reveal-wrapper">
            <h2 className="section-title">02. Capabilities</h2>
            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <div className="skill-card glass-panel" key={index}>
                        <div>
                            <div style={{ color: 'var(--accent-purple)', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{skill.level}</div>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{skill.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
