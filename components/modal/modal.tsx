"use client";
import "./modal.css";
import { useRef, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Modal({ onClose, children, header, showModal }: { onClose: () => void, children: React.ReactNode, header: string, showModal: boolean }) {
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

    // Animation variants
    const overlayVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const modalVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        exit: { opacity: 0, y: 50 }
    };

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="modal"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={overlayVariants}
                >
                    <motion.div
                        className="modal-content"
                        ref={modalRef}
                        variants={modalVariants}
                    >
                        <div className="modal-header">
                            <h1>{header}</h1>
                            <IoCloseCircle style={{ cursor: "pointer", fontSize: "1.5rem" }} onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}