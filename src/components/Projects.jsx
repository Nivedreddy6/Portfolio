import React from 'react';

const Projects = () => {
    const projectList = [
        {
            category: "Frontend Architecture",
            title: "Angular Employee Dashboard",
            description: "Developed a comprehensive enterprise dashboard in Angular tracking real-time workforce metrics, including total active vs. inactive employee counts, dynamic department-wise distribution charts, and detailed personnel tables.",
            image: "/project_angular.png",
            link: "https://angular-peach-nu.vercel.app/login"
        },
        {
            category: "Enterprise Integration",
            title: "OIC Automation Suite",
            description: "Automated complex employee onboarding workflows utilizing Oracle Integration Cloud. Designed seamless fault-tolerant integrations and sophisticated error handling.",
            image: "/project_oic.png"
        },
        {
            category: "Application Engineering",
            title: "Collegiate Datacore",
            description: "A cyberpunk-styled Java desktop application for managing student records. Features real-time visual analytics (pie charts), custom neon UI components, robust input validation, and secure CRUD operations.",
            image: "/project_java.png",
            link: "/CollegiateDatacore.jar"
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
                {projectList.map((project, idx) => {
                    const CardWrapper = project.link ? 'a' : 'div';
                    const wrapperProps = project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};

                    return (
                        <CardWrapper
                            className="project-card glass-panel"
                            key={idx}
                            {...wrapperProps}
                            style={project.link ? { textDecoration: 'none', color: 'inherit', display: 'block' } : {}}
                        >
                            <div className="project-image-wrapper">
                                <img src={project.image} alt={project.title} className="project-img" />
                            </div>
                            <div className="project-content">
                                <div className="project-category">{project.category}</div>
                                <h3 className="flicker">{project.title}</h3>
                                <p>{project.description}</p>
                            </div>
                        </CardWrapper>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
