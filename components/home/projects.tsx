"use client";
import Link from "next/link";
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
                            <Link className="slide-button" href="https://github.com/motocru/kevinu">GitHub Link</Link>
                        </div>
                    </div>
                </div>
                <div className="project-container">
                    <div className="project-info">
                        <h2 className="project-title">Grammar Guru</h2>
                        <p className="project-description">A game of Hangman with a few extra bells and whistles like color
                            scheme, difficulty and font selection.</p>
                        <div className="project-links">
                            <Link className="slide-button" href="/projects/grammar-guru">Playable Version</Link>
                            <Link className="slide-button" href="https://github.com/motocru/GrammarGuru">GitHub Link</Link>
                        </div>
                    </div>
                    <div className="project-image">
                        <img src='/projects/grammarGuru.png' alt='grammarGuru' />
                    </div>
                </div>
                <div className="project-container">
                    <div className="project-image">
                        <img src='/projects/quakeTimer.png' alt='quakeTimer' />
                    </div>
                    <div className="project-info">
                        <h2 className="project-title">Quake Timer</h2>
                        <p className="project-description">A game made to help with timing out item spawns for competitive Quake players.
                            Game supports Quake Live and Quake Champions timing.
                        </p>
                        <div className="project-links">
                            <Link className="slide-button" href="/projects/timer">Playable Version</Link>
                            <Link className="slide-button" href="https://github.com/motocru/GrammarGuru">GitHub Link</Link>
                        </div>
                    </div>
                </div>
                <div className="project-container">
                    <div className="project-info">
                        <h2 className="project-title">Curse Bot</h2>
                        <p className="project-description">A Discord bot made to track different levels of profanity on a server.
                            Made using the discord.js library. Servers to remind users of their cursing and allows them to also
                            define their own words to track.
                        </p>
                        <div className="project-links">
                            <Link className="slide-button" href="/projects/timer">Discord Application Link</Link>
                            <Link className="slide-button" href="https://github.com/motocru/curse-bot">GitHub Link</Link>
                        </div>
                    </div>
                    <div className="project-image">
                        <img src='/projects/curseBot.png' alt='curseBot' />
                    </div>
                </div>
            </div>
        </SectionComponent>
    );
}