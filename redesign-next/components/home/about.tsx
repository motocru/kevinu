"use client";
import './home.css';
import FlyInComponent from '../flyInComponent';

export default function About() {
    return (
        <section id="about" className="section">
            <div className="section-header">
                <h1 className="text-5xl">About</h1>
            </div>
            <div className="section-content">
                <FlyInComponent>
                    <div className="split-screen">
                        <div className="pane">
                            <img src='/headshot.png' className="profile-image" alt="Profile" />
                            <p>
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
                                    <img src='/csharp.png' className="tech-images" alt="C#" />
                                    <label htmlFor="CSharp">C#</label>
                                    <img src='/css-3.svg' className="tech-images" alt="CSS" />
                                    <label htmlFor="CSS">CSS</label>
                                    <img src='/dotnet-logo.png' className="tech-images" alt=".NET" />
                                    <label htmlFor=".NET">.NET</label>
                                    <img src='/expressjs.svg' className="tech-images" alt="Express" />
                                    <label htmlFor="Express">Express.JS</label>
                                    <img src='/html-logo.png' className="tech-images" alt="HTML" />
                                    <label htmlFor="HTML">HTML</label>
                                </div>
                                <div className="tech-column">
                                    <img src='/graphQL.png' className="tech-images" alt="GraphQL" />
                                    <label htmlFor="GraphQL">GraphQL</label>
                                    <img src='/MySQL-Logo.png' className="tech-images" alt="MySQL" />
                                    <label htmlFor="MySQL">MySQL</label>
                                    <img src='/nodejs-icon.svg' className="tech-images" alt="Node.js" />
                                    <label htmlFor="Node.js">Node.js</label>
                                    <img src='/svelte.png' className="tech-images" alt="Svelte" />
                                    <label htmlFor="Svelte">Svelte</label>
                                    <img src='/react.svg' className="tech-images" alt="React" />
                                    <label htmlFor="React">React</label>
                                    <img src='/mongodb.png' className="tech-images" alt="MongoDB" />
                                    <label htmlFor="MongoDB">MongoDB</label>
                                </div>
                                <div className="tech-column">
                                    <img src='/typescript.png' className="tech-images" alt="TypeScript" />
                                    <label htmlFor="TypeScript">TypeScript</label>
                                    <img src='/dart.png' className="tech-images" alt="Dart" />
                                    <label htmlFor="Dart">Dart</label>
                                    <img src='/flutter.png' className="tech-images" alt="Flutter" />
                                    <label htmlFor="Flutter">Flutter</label>
                                    <img src='/google-cloud.png' className="tech-images" alt="Google Cloud" />
                                    <label htmlFor="Google Cloud">Google Cloud</label>
                                    <img src='/nextjs.svg' className="tech-images" alt="Next.js" />
                                    <label htmlFor="Next.js">Next.JS</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </FlyInComponent>
            </div>
        </section>
    );
}