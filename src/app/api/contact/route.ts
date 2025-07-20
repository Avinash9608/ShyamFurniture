
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const newContact = new Contact(body);
    await newContact.save();
    
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
