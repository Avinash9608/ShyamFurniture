
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Offer from '@/models/Offer';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Check if promo code already exists
    const existingOffer = await Offer.findOne({ code: body.code });
    if (existingOffer) {
      return NextResponse.json({ message: 'Promo code already exists.' }, { status: 409 });
    }

    const newOffer = new Offer(body);
    await newOffer.save();
    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error("API_OFFERS_POST_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error creating offer', error: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const offers = await Offer.find({}).sort({ createdAt: -1 });
    return NextResponse.json(offers);
  } catch (error) {
     console.error("API_OFFERS_GET_ERROR", error);
     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error fetching offers', error: errorMessage }, { status: 500 });
  }
}
