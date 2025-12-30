"use client";

import SectionComponent from "./sectionComponent";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";

export default function Resume({ idCallback }: { idCallback?: (id: string) => void }) {
    function getYearsExperience() {
        const today = new Date();
        const startDate = new Date("2020-01-01");
        const diffTime = today.getTime() - startDate.getTime();
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
        return diffYears;
    }

    return (
        <SectionComponent id="resume" callback={idCallback}>
            <div className="section-header">
                <h1 className="text-5xl">Resume</h1>
            </div>
            <div className="section-content">
                {/* TODO: Add resume content */}
                <div className="max-w-4xl mx-auto p-8 bg-white text-slate-800 font-sans shadow-lg my-10 border-t-8 border-blue-600">
                    {/* HEADER SECTION */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 mb-8">
                        <div>
                            <h1 className="text-4xl font-light text-slate-900">
                                <span className="font-bold text-blue-600">Kevin Urban</span>
                            </h1>
                            <p className="text-xl text-slate-500 mt-1">Software Developer</p>
                        </div>

                        <div className="grid grid-cols-1 gap-2 mt-4 md:mt-0 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                La Crosse, WI
                            </div>
                            <div className="flex items-center gap-2">
                                (920) 224-4375
                            </div>
                            <div className="flex items-center gap-2 text-blue-600 hover:underline">
                                <a href="mailto:urban.kevi@gmail.com">urban.kevi@gmail.com</a>
                            </div>
                            <div className="flex gap-4 mt-1">
                                <a href="https://linkedin.com/in/kevin-u" className="text-blue-600 hover:text-blue-800"><AiOutlineLinkedin style={{ fontSize: "1.5rem" }} /></a>
                                <a href="https://github.com/motocru" className="text-blue-600 hover:text-blue-800"><AiOutlineGithub style={{ fontSize: "1.5rem" }} /></a>
                            </div>
                        </div>
                    </header>

                    {/* SUMMARY */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-blue-600 uppercase tracking-widest border-b-2 border-slate-100 mb-3">Professional Summary</h2>
                        <p className="leading-relaxed">
                            Results-driven Software Developer with {getYearsExperience()} years of experience specializing in modern multi-platform applications, leveraging <strong>C#</strong>, <strong>Svelte</strong>, and <strong>Flutter</strong>.
                            Expertise in designing robust APIs with <strong>TypeScript</strong> and <strong>GraphQL</strong>, and managing data with modern <strong>SQL</strong> and <strong>NoSQL</strong> solutions.
                            Proven ability to deliver scalable, high-performance solutions in agile teams.
                        </p>
                    </section>

                    {/* EXPERIENCE */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-blue-600 uppercase tracking-widest border-b-2 border-slate-100 mb-4">Professional Experience</h2>

                        {/* Reconyx Inc. */}
                        <div className="mb-6">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-slate-900">Mid-Level Software Engineer</h3>
                                <span className="text-sm font-medium text-slate-500 italic">2020 — Present</span>
                            </div>
                            <div className="text-blue-700 font-medium mb-2">Reconyx Inc. | Onalaska, WI</div>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li>Led the migration of several <strong>C#</strong> REST API architectures to <strong>GraphQL</strong> services.</li>
                                <li>Developed and maintained critical backend microservices using <strong>C# (.NET Core)</strong>, <strong>Google Firebase</strong>, <strong>Kubernetes</strong> and <strong>SQL Server</strong>, handling over 1 million daily requests.</li>
                                <li>Engineered modern, highly interactive user interfaces using <strong>Svelte</strong> and <strong>TypeScript</strong>.</li>
                                <li>Developed and maintained a mobile app for both iOS and Android using <strong>Dart</strong> and <strong>Flutter</strong>.</li>
                            </ul>
                        </div>

                        {/* Three Rivers */}
                        <div className="mb-6">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-slate-900">SQA Tester</h3>
                                <span className="text-sm font-medium text-slate-500 italic">2018 — 2020</span>
                            </div>
                            <div className="text-blue-700 font-medium mb-2">Three Rivers Technologies | Rochester, MN</div>
                            <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                <li>Tested applications for multiple departments adding features to active systems and replacing legacy systems.</li>
                                <li>Wrote automated test software using <strong>C#</strong>, <strong>Selenium</strong>, and <strong>MSTest</strong>, reducing regression testing from 8 hours to 90 minutes.</li>
                            </ul>
                        </div>
                    </section>

                    {/* EDUCATION */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-blue-600 uppercase tracking-widest border-b-2 border-slate-100 mb-3">Education</h2>
                        <div className="flex justify-between items-baseline">
                            <div>
                                <span className="font-bold">B.S. in Computer Science</span>
                                <div className="text-blue-700">University of Wisconsin - La Crosse</div>
                            </div>
                            <span className="text-sm font-medium text-slate-500 italic">2014 — 2018</span>
                        </div>
                        <p className="text-sm mt-1">Focused coursework in Data Structures and Algorithms.</p>
                    </section>

                    {/* SKILLS TABLE */}
                    <section>
                        <h2 className="text-lg font-bold text-blue-600 uppercase tracking-widest border-b-2 border-slate-100 mb-3">Technical Skills</h2>
                        <div className="grid grid-cols-[150px_1fr] gap-y-2 text-sm">
                            <div className="font-bold text-slate-600 uppercase text-[10px] self-center">Languages & Tools</div>
                            <div>C#, TypeScript, JavaScript, SQL, Dart, HTML5, CSS3, Flutter, GraphQL</div>

                            <div className="font-bold text-slate-600 uppercase text-[10px] self-center">Frameworks</div>
                            <div>.NET Core/Web API, Svelte, SvelteKit, Flutter, Tailwind CSS</div>

                            <div className="font-bold text-slate-600 uppercase text-[10px] self-center">Cloud & DevOps</div>
                            <div>Google Cloud, Kubernetes, CI/CD (GitHub Actions), Linux, RESTful/GraphQL APIs</div>
                        </div>
                    </section>
                </div>
                <div className="flex justify-center">
                    <button className="slide-button" style={{ fontSize: '22px' }}>
                        <a href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer">
                            Download Resume
                        </a>
                    </button>
                </div>
            </div>
        </SectionComponent>
    );
}