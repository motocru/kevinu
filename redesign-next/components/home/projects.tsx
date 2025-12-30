"use client";
import SectionComponent from "./sectionComponent";

export default function Projects({ idCallback }: { idCallback?: (id: string) => void }) {
    return (
        <SectionComponent id="projects" callback={idCallback}>
            <div className="section-header">
                <h1 className="text-5xl">Projects</h1>
            </div>
            <div className="section-content">

            </div>
        </SectionComponent>
    );
}