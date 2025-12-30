"use client";
import './home.css';
import FlyInComponent from '../flyInComponent';
import { useState } from 'react';
import SectionComponent from "./sectionComponent";

export default function About({ idCallback }: { idCallback?: (id: string) => void }) {
    const initialBooleans = new Array(16).fill(false);
    const [techToggles, setToggles] = useState<boolean[]>(initialBooleans);

    function toggleTech() {
        let timers: NodeJS.Timeout[] = [];

        techToggles.forEach((_, index) => {
            const timer = setTimeout(() => {
                setToggles((prevToggles) => {
                    // 1. Create a shallow copy of the previous state
                    const nextToggles = [...prevToggles];
                    // 2. Update only the specific index
                    nextToggles[index] = true;
                    return nextToggles;
                });
            }, (Math.random() * (16 - 1) + 1) * 100);

            timers.push(timer);
        });
        return () => timers.forEach(clearTimeout);
    }

    const getVisible = (isVisible: boolean) =>
        `tech-element ${isVisible ? "is-visible" : ""}`;

    return (
        <SectionComponent id="about" callback={idCallback}>
            <div className="section-header">
                <h1 className="text-5xl">About</h1>
            </div>
            <div className="section-content">
                <FlyInComponent callback={toggleTech}>
                    <div className="split-screen">
                        <div className="pane">
                            <img src='/headshot.png' className="profile-image" alt="Profile" />
                            <p style={{ marginLeft: "3rem", marginRight: "3rem" }}>
                                A deeply passionate full stack and app developer with whom learning never stops. I have
                                experience in a wide range of technologies and frameworks, and I am always looking for
                                new opportunities to learn and grow. I also have experience with cloud services and
                                deployment. When not coding, I enjoy playing video games, reading books, hiking,
                                snowboarding and spending time with my wife and dog.
                            </p>
                        </div>
                        <div className="pane">
                            <div className='tech-container'>
                                {/* TODO: Add checks for the background color and replace with
                                    images that don't blend into the background */}
                                <div className="tech-column">
                                    <div className={getVisible(techToggles[0])}>
                                        <img src='/csharp.png' className='tech-images' alt="C#" />
                                        <label htmlFor="CSharp">C#</label>
                                    </div>
                                    <div className={getVisible(techToggles[1])}>
                                        <img src='/css-3.svg' className='tech-images' alt="CSS" />
                                        <label htmlFor="CSS">CSS</label>
                                    </div>
                                    <div className={getVisible(techToggles[2])}>
                                        <img src='/dotnet.png' className='tech-images' alt=".NET" />
                                        <label htmlFor=".NET">.NET</label>
                                    </div>
                                    <div className={getVisible(techToggles[3])}>
                                        <img src='/expressjs-white.svg' className='tech-images' alt="Express" />
                                        <label htmlFor="Express">Express.JS</label>
                                    </div>
                                    <div className={getVisible(techToggles[4])}>
                                        <img src='/html-logo.png' className='tech-images' alt="HTML" />
                                        <label htmlFor="HTML">HTML</label>
                                    </div>
                                </div>
                                <div className="tech-column">
                                    <div className={getVisible(techToggles[5])}>
                                        <img src='/graphQL.png' className='tech-images' alt="GraphQL" />
                                        <label htmlFor="GraphQL">GraphQL</label>
                                    </div>
                                    <div className={getVisible(techToggles[6])}>
                                        <img src='/MySQL-Logo.png' className='tech-images' alt="MySQL" />
                                        <label htmlFor="MySQL">MySQL</label>
                                    </div>
                                    <div className={getVisible(techToggles[7])}>
                                        <img src='/nodejs-icon.svg' className='tech-images' alt="Node.js" />
                                        <label htmlFor="Node.js">Node.js</label>
                                    </div>
                                    <div className={getVisible(techToggles[8])}>
                                        <img src='/svelte.png' className='tech-images' alt="Svelte" />
                                        <label htmlFor="Svelte">Svelte</label>
                                    </div>
                                    <div className={getVisible(techToggles[9])}>
                                        <img src='/react.svg' className='tech-images' alt="React" />
                                        <label htmlFor="React">React</label>
                                    </div>
                                    <div className={getVisible(techToggles[10])}>
                                        <img src='/mongodb.png' className='tech-images' alt="MongoDB" />
                                        <label htmlFor="MongoDB">MongoDB</label>
                                    </div>
                                </div>
                                <div className="tech-column">
                                    <div className={getVisible(techToggles[11])}>
                                        <img src='/typescript.png' className='tech-images' alt="TypeScript" />
                                        <label htmlFor="TypeScript">TypeScript</label>
                                    </div>
                                    <div className={getVisible(techToggles[12])}>
                                        <img src='/dart.png' className='tech-images' alt="Dart" />
                                        <label htmlFor="Dart">Dart</label>
                                    </div>
                                    <div className={getVisible(techToggles[13])}>
                                        <img src='/flutter.png' className='tech-images' alt="Flutter" />
                                        <label htmlFor="Flutter">Flutter</label>
                                    </div>
                                    <div className={getVisible(techToggles[14])}>
                                        <img src='/google-cloud.png' className='tech-images' alt="Google Cloud" />
                                        <label htmlFor="Google Cloud">Google Cloud</label>
                                    </div>
                                    <div className={getVisible(techToggles[15])}>
                                        <img src='/nextjs-white.svg' className='tech-images' alt="Next.js" />
                                        <label htmlFor="Next.js">Next.JS</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FlyInComponent>
            </div>
        </SectionComponent>
    );
}