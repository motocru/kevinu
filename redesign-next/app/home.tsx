"use client";
import { useEffect, useState } from "react";
import "./home.css";
import { BrowserRouter, Link } from "react-router-dom";

export default function Home() {
    const [isH1Visible, setIsH1Visible] = useState(false);
    const [isH2Visible, setIsH2Visible] = useState(false);
    const [isPVisible, setIsPVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setIsH1Visible(true), 100),
            setTimeout(() => setIsH2Visible(true), 1000),
            setTimeout(() => setIsPVisible(true), 1800),
            setTimeout(() => setIsButtonVisible(true), 600)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const getClass = (isVisible: boolean) =>
        `title-element ${isVisible ? "is-visible" : ""}`;

    return (
        <BrowserRouter><div>
            <section id="home" className="section">
                <div className="section-content">
                    <div className="split-screen">
                        <div className="pane">
                            <h1 className={getClass(isH1Visible)}>Kevin Urban</h1>
                            <h2 className={getClass(isH2Visible)}>Full Stack Developer</h2>
                            <p className={getClass(isPVisible)}>
                                My name is Kevin Urban and I am a full stack developer with a passion for creating
                                innovative and user-friendly web applications.
                            </p>
                        </div>
                        <div className="pane">
                            <Link to="#about">
                                <button className={getClass(isButtonVisible) + " view-work-button"}>
                                    <div style={{ fontSize: "20px" }}>View my work</div>
                                    <span style={{ fontSize: "18px" }}>↓</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section id="about" className="section">
                <div className="section-content">
                    <div className="split-screen">
                        <div className="pane">
                            <h1 className={getClass(isH1Visible)}>About</h1>
                        </div>
                    </div>
                </div>
            </section>
        </div></BrowserRouter>

    );
}

