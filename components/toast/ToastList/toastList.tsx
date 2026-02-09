import Toast from "../toast";
import './toastList.css';

import React, { useRef, useEffect } from 'react';

export default function ToastList({ data, position, removeToast }:
    {
        data: { id: string, message: string, type: 'success' | 'failure' | 'warning' }[],
        position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
        removeToast: (id: string) => void
    }) {
    const listRef = useRef<HTMLDivElement>(null);

    const handleScrolling = (el: HTMLDivElement) => {
        const isTopPosition = ["top-left", "top-right"].includes(position);
        if (isTopPosition) {
            el?.scrollTo(0, el.scrollHeight);
        } else {
            el?.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        const el = listRef.current;
        if (el) {
            handleScrolling(el);
        }
    }, [position, data]);

    const sortedData = position.includes("bottom")
        ? [...data].reverse()
        : [...data];

    return (
        sortedData.length > 0 && (
            <div className={`toast-list toast-list-${position}`} aria-live="assertive" ref={listRef}>
                {sortedData.map((toast) => (
                    <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        )
    );
}