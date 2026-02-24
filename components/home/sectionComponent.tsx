"use client";
import { useInView } from 'react-intersection-observer'

export default function SectionComponent({ children, id, callback }:
    { children: React.ReactNode, id: string, callback?: (id: string) => void }) {

    const [ref] = useInView({
        threshold: [0, 0.25, 0.5, 0.75, 1],
        onChange: (inView, entry) => {
            // If the section is larger than the viewport, trigger if it covers more than 50% of the viewport.
            const coversViewportCenter = inView && entry.intersectionRect.height > window.innerHeight / 2;

            if (coversViewportCenter) {
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