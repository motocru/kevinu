"use client";
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer'

export default function SectionComponent({ children, id, callback }:
    { children: React.ReactNode, id: string, callback?: (id: string) => void }) {

    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            console.log(`Section ${id} is visible`);
            callback?.(id);
        }
    }, [inView]);

    return (
        <section className="section" id={id} ref={ref}>
            {children}
        </section>
    );
}