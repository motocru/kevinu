"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail() {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "urban.kevi@gmail.com",
        subject: "Hello World",
        html: "<h1>Hello World</h1><br><b>Test</b>",
    });
}