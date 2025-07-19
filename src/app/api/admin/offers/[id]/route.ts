
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Offer from '@/models/Offer';

// GET a single offer by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const offer = await Offer.findById(params.id);
    if (!offer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }
    return NextResponse.json(offer);
  } catch (error) {
    console.error("API_OFFER_GET_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error fetching offer', error: errorMessage }, { status: 500 });
  }
}

// UPDATE an offer by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await request.json();
    const updatedOffer = await Offer.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedOffer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }
    return NextResponse.json(updatedOffer);
  } catch (error) {
    console.error("API_OFFER_PUT_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error updating offer', error: errorMessage }, { status: 500 });
  }
}

// DELETE an offer by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedOffer = await Offer.findByIdAndDelete(params.id);
    if (!deletedOffer) {
      return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error("API_OFFER_DELETE_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error deleting offer', error: errorMessage }, { status: 500 });
  }
}
