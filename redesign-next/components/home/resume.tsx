"use client";
import SectionComponent from "./sectionComponent";

export default function Resume({ idCallback }: { idCallback?: (id: string) => void }) {
    return (
        <SectionComponent id="resume" callback={idCallback}>
            <div className="section-header">
                <h1 className="text-5xl">Resume</h1>
            </div>
            <div className="section-content">
                {/* TODO: Add resume content */}
            </div>
        </SectionComponent>
    );
}