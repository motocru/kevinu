"use client";
import { useInView } from 'react-intersection-observer'

export default function SectionComponent({ children, id, callback }:
    { children: React.ReactNode, id: string, callback?: (id: string) => void }) {

    const [ref] = useInView({
        threshold: [0, 0.25, 0.5, 0.75, 1],
        onChange: (inView, entry) => {
            if (entry.intersectionRatio > 0.5) {
                callback?.(id);
            }
        }
    });

    return (
        <section className="section" id={id} ref={ref}>
            {children}
        </section>
    );
}