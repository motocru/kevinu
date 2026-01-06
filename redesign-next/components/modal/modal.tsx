"use client";
import "./modal.css";
import { useRef, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function Modal({ onClose, children, header }: { onClose: () => void, children: React.ReactNode, header: string }) {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);
    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <div className="modal-header">
                    <h1>{header}</h1>
                    <IoCloseCircle style={{ cursor: "pointer", fontSize: "1.5rem" }} onClick={onClose} />
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}