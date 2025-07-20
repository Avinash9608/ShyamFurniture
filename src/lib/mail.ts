
import nodemailer from 'nodemailer';

type MailOptions = {
    to: string;
    subject: string;
    html: string;
}

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

export async function sendMail({ to, subject, html }: MailOptions) {
    try {
        const info = await transporter.sendMail({
            from: `Shyam Furniture <${EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw new Error("Could not send email.");
    }
}
