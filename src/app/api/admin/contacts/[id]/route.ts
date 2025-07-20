
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';

<<<<<<< HEAD
// DELETE a contact by ID
=======
>>>>>>> 2e694bb (Contact delete option also in admin panel)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedContact = await Contact.findByIdAndDelete(params.id);
<<<<<<< HEAD
    if (!deletedContact) {
      return NextResponse.json({ message: 'Contact not found' }, { status: 404 });
    }
=======

    if (!deletedContact) {
      return NextResponse.json({ message: 'Contact not found' }, { status: 404 });
    }

>>>>>>> 2e694bb (Contact delete option also in admin panel)
    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error("API_CONTACT_DELETE_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error deleting contact', error: errorMessage }, { status: 500 });
  }
}
