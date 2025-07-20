
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { sendMail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const newContact = new Contact(body);
    await newContact.save();
    
    // Send notification email to admin
    try {
        if (!process.env.EMAIL_USER) {
            console.error("EMAIL_USER environment variable is not set. Cannot send notification email.");
        } else {
            await sendMail({
                to: process.env.EMAIL_USER,
                subject: `New Contact Form Submission from ${body.name}`,
                html: `
                    <p>You have received a new message from your website's contact form.</p>
                    <ul>
                        <li><strong>Name:</strong> ${body.name}</li>
                        <li><strong>Email:</strong> ${body.email}</li>
                        <li><strong>Phone:</strong> ${body.phone || 'Not provided'}</li>
                        <li><strong>Address:</strong> ${body.address || 'Not provided'}</li>
                    </ul>
                    <h2>Message:</h2>
                    <p>${body.message.replace(/\n/g, '<br>')}</p>
                `
            });
        }
    } catch (mailError) {
        console.error("Failed to send notification email:", mailError);
        // Do not block the user response for this, just log it. The primary action (saving to DB) succeeded.
    }

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 201 });
  } catch (error) {
    console.error("API_CONTACT_POST_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (error instanceof Error && 'errors' in error) {
      // Mongoose validation error
       return NextResponse.json({ message: 'Validation failed', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error sending message', error: errorMessage }, { status: 500 });
  }
}
