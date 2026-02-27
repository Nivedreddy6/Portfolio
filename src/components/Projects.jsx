import React from 'react';

const Projects = () => {
    const projectList = [
        {
            category: "Frontend Architecture",
            title: "Angular Employee Dashboard",
            description: "Developed a comprehensive enterprise dashboard in Angular tracking real-time workforce metrics, including total active vs. inactive employee counts, dynamic department-wise distribution charts, and detailed personnel tables.",
            image: "/project_angular.png"
        },
        {
            category: "Enterprise Integration",
            title: "OIC Automation Suite",
            description: "Automated complex employee onboarding workflows utilizing Oracle Integration Cloud. Designed seamless fault-tolerant integrations and sophisticated error handling.",
            image: "/project_oic.png"
        },
        {
            category: "Application Engineering",
            title: "Student Management Core",
            description: "Developed a comprehensive Java desktop application incorporating secure CRUD operations, strong input validation, and highly optimized persistence sequences.",
            image: "/project_java.png"
        },
        {
            category: "Data Architecture",
            title: "Library Informatics DB",
            description: "Engineered a highly scalable SQL database schema featuring cascading triggers, stored procedures, and automated backend reporting logic.",
            image: "/project_sql.png"
        }
    ];

    return (
        <section id="projects" className="section reveal-wrapper">
            <h2 className="section-title">03. Project Logs</h2>
            <div className="projects-grid">
                {projectList.map((project, idx) => (
                    <div className="project-card glass-panel" key={idx}>
                        <div className="project-image-wrapper">
                            <img src={project.image} alt={project.title} className="project-img" />
                        </div>
                        <div className="project-content">
                            <div className="project-category">{project.category}</div>
                            <h3 className="flicker">{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
