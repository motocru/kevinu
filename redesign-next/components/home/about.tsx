"use client";
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'

export default function About() {
    const flyInVariants = {
        hidden: { opacity: 0, x: -100 }, // Starts off-screen to the left
        visible: {
            opacity: 1, x: 0, transition:
                { duration: 0.8, ease: "easeOut" }
        }, // Flies in
    }

    return (
        <section id="about" className="section">
            <div className="section-header">
                <h1 className="text-5xl">About</h1>
            </div>
            <div className="section-content">
                <div className="split-screen">
                    <div className="pane">
                        <p>
                            A deeply passionate full stack and app developer with whom learning never stops. I have
                            experience in a wide range of technologies and frameworks, and I am always looking for
                            new opportunities to learn and grow. I also have experience with cloud services and
                            deployment. When not coding, I enjoy playing video games, reading books, hiking,
                            snowboarding and spending time with my wife and dog.
                        </p>
                    </div>
                    <div className="pane">
                        <p>lorem ipsum text</p>
                    </div>
                </div>
            </div>
        </section>
    );
}