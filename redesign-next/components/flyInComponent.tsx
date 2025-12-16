"use client";
import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer'

const flyInVariants: Variants = {
    hidden: { opacity: 0, x: -100 }, // Starts off-screen to the left
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }, // Flies in
}

export default function FlyInComponent({ children }: { children: React.ReactNode }) {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={flyInVariants}
        >
            {children}
        </motion.div>
    );
}