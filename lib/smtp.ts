"use server";
import { ErrorResponse, Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(name: string, email: string, message: string): Promise<ErrorResponse | null> {
    var response = await resend.emails.send({
        from: "notifications@notifications.kevin-u.com",
        to: "urban.kevi@gmail.com",
        subject: `New message from kevin-u.com`,
        html: `<h1>From, ${name}</h1><br>Email: ${email}<br><p>Message: ${message}</p>`,
    });
    return response.error;
}