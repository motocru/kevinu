"use client";

import { useState } from "react";
import { sendEmail } from "../../lib/smtp";

export default function Contact() {
    const formattedText = 'Have a question or want to contact me for a project?\n' +
        'Leave a detailed message below and I will try to get back to you as soon as possible.';

    const [showNameError, setShowNameError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showMessageError, setShowMessageError] = useState(false);

    async function handleContactFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;
        if (!name || !email || !message) {
            setShowNameError(!name);
            setShowEmailError(!email);
            setShowMessageError(!message);
            return;
        }

        await sendEmail();
    }

    const getClass = (isVisible: boolean) =>
        `title-element ${isVisible ? "is-visible" : ""}`;

    return (
        <section id="contact" className="section">
            <div className="section-header">
                <h1 className="text-5xl">Contact</h1>
            </div>
            <div className="section-content">
                {/* TODO: Add contact content */}
                <div className="pane">
                    <p className="text-xl" style={{ textAlign: "center", padding: "2rem" }}>{formattedText}</p>
                    <div>
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
                                <div className="contact-form-pane">
                                    <div className="submit-column">
                                        <button type="submit">SEND</button>
                                        <button type="reset">CLEAR</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}