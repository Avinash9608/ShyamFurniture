
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
      await sendMail({
        to: process.env.EMAIL_USER!,
        subject: `New Contact Form Submission from ${body.name}`,
        html: `
          <h1>New Contact Message</h1>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone || 'N/A'}</p>
          <p><strong>Address:</strong> ${body.address || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message.replace(/\n/g, '<br>')}</p>
        `,
      });
    } catch (mailError) {
        console.error("Failed to send notification email:", mailError);
        // Don't block the user response if email fails, just log it.
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
