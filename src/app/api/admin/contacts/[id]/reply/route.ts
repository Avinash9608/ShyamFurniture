
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { sendMail } from '@/lib/mail';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await request.json();
    const { recipient, message } = body;

    const contact = await Contact.findById(params.id);
    if (!contact) {
      return NextResponse.json({ message: 'Contact not found' }, { status: 404 });
    }

    await sendMail({
        to: recipient,
        subject: `Re: Your inquiry to Shyam Furniture`,
        html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
    });
    
    contact.status = 'replied';
    await contact.save();

    return NextResponse.json({ message: 'Reply sent and status updated' });
  } catch (error) {
    console.error("API_REPLY_POST_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error sending reply', error: errorMessage }, { status: 500 });
  }
}
