"use client";
import SectionComponent from "./sectionComponent";

export default function Projects({ idCallback }: { idCallback?: (id: string) => void }) {
    return (
        <SectionComponent id="projects" callback={idCallback}>
            <div className="section-header">
                <h1 className="text-5xl">Projects</h1>
            </div>
            <div className="section-content">
                <div className="project-container">
                    <div className="project-image">
                        <img src='/projects/kevin-u.com.png' alt='kevinu-com' />
                    </div>
                    <div className="project-info">
                        <h2 className="project-title">Kevin-u.com</h2>
                        <p className="project-description">The website you are currently on!
                            It is a website that I created to showcase my projects and my skills.
                            It is also a place where I can try out some new ideas and technologies.</p>
                        <div className="project-links">
                            <a href="https://github.com/kevinu1999/kevinu-com">GitHub</a>
                        </div>
                    </div>

                </div>

            </div>
        </SectionComponent>
    );
}