"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SectionComponent from "./sectionComponent";
import './home.css';

export default function Home({ idCallback }: { idCallback?: (id: string) => void }) {
    const [isH1Visible, setIsH1Visible] = useState(false);
    const [isH2Visible, setIsH2Visible] = useState(false);
    const [isPVisible, setIsPVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setIsH1Visible(true), 100),
            setTimeout(() => setIsH2Visible(true), 1000),
            setTimeout(() => setIsPVisible(true), 1800),
            setTimeout(() => setIsButtonVisible(true), 2000)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const getVisible = (isVisible: boolean) =>
        `title-element ${isVisible ? "is-visible" : ""}`;

    return (
        <SectionComponent id="home" callback={idCallback}>
            <div className="section-content">
                <div className="pane">
                    <h1 className={`text-5xl home-title ${getVisible(isH1Visible)}`}>Kevin Urban</h1>
                    <h2 className={`text-3xl home-title ${getVisible(isH2Visible)}`}>Full Stack Developer</h2>
                    <p className={`text-xl home-title ${getVisible(isPVisible)}`}>
                        My name is Kevin Urban and I am a full stack developer with a passion for creating
                        innovative and user-friendly web applications.
                    </p>
                    <div className={`pt-4 ${getVisible(isButtonVisible)}`}>
                        <Link href="#about">
                            <button className="view-work-button">
                                <div style={{ fontSize: "20px" }}>View my work</div>
                                <span style={{ fontSize: "18px" }}>↓</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </SectionComponent>
    );
}