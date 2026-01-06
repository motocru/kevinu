"use client";

import { useState } from "react";
import { sendEmail } from "../../lib/smtp";
import SectionComponent from "./sectionComponent";
import ToastList from "../toast/ToastList/toastList";
import { Toast, setToast } from "../toast/toastFunction";

export default function Contact({ idCallback }: { idCallback?: (id: string) => void }) {
    const [showNameError, setShowNameError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showMessageError, setShowMessageError] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [loading, setLoading] = useState(false);

    async function handleContactFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;
        if (!name || !email || !message) {
            setShowNameError(!name);
            setShowEmailError(!email);
            setShowMessageError(!message);
            const toast: Toast = {
                id: Date.now().toString(),
                message: "Please fill out all fields",
                type: "failure"
            };
            setToast(toast, setToasts);
            setLoading(false);
            return;
        }

        const error = await sendEmail(name, email, message);
        //TODO: I need to figure out how to properly get logs from the server without having to SSH
        if (error) {
            console.log(error.message);
            const toast: Toast = {
                id: Date.now().toString(),
                message: error.message,
                type: "failure"
            };
            setToast(toast, setToasts);
        } else {
            const toast: Toast = {
                id: Date.now().toString(),
                message: "Message sent successfully",
                type: "success"
            };
            setToast(toast, setToasts);
            clearForm();
        }
        setLoading(false);
    }

    const getClass = (isVisible: boolean) =>
        `title-element ${isVisible ? "is-visible" : ""}`;

    const removeToast = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    const clearForm = () => {
        setShowNameError(false);
        setShowEmailError(false);
        setShowMessageError(false);

        const form = document.querySelector('form') as HTMLFormElement;
        form.reset();
    };

    return (
        <SectionComponent id="contact" callback={idCallback}>
            <div className="section-header">
                <h1 className="text-5xl">Contact</h1>
            </div>
            <div className="section-content">
                <div className="pane">
                    <p className="text-xl" style={{ textAlign: "center", padding: "2rem" }}>
                        Have a question or want to contact me for a project?<br></br>
                        Leave a detailed message below and I will try to get back to you as soon as possible.
                    </p>
                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={handleContactFormSubmit}>
                            <input type="text" placeholder="Name" name="name" />
                            <input type="email" placeholder="Email" name="email" />
                            <textarea placeholder="Message" name="message"></textarea>
                            <div className="contact-form-submit">
                                <div className="contact-form-pane">
                                    {showNameError && <p className={getClass(showNameError)}>Please enter your name</p>}
                                    {showEmailError && <p className={getClass(showEmailError)}>Please enter a valid email</p>}
                                    {showMessageError && <p className={getClass(showMessageError)}>Please enter your message</p>}
                                </div>
                                <ToastList data={toasts} position="bottom-right" removeToast={removeToast} />
                                <div className="contact-form-pane">
                                    <div className="submit-column">
                                        <button className="slide-button" type="submit">SEND</button>
                                        <button className="slide-button" type="button" onClick={clearForm}>CLEAR</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {loading && (
                            <div className="loading-overlay">
                                <div className="loading-spinner"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SectionComponent>
    );
}