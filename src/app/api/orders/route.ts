import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

export async function POST(request: NextRequest) {
  try {
    console.log('ORDER API HIT');
    const body = await request.json();
    const { userId, productId, name, email, phone, address, paymentMode } = body;
    if (!userId || !productId || !name || !email || !phone || !address || !paymentMode) {
      console.log('ORDER API MISSING FIELD', { userId, productId, name, email, phone, address, paymentMode });
      throw new Error('Missing required field');
    }
    await dbConnect();
    console.log('DB CONNECTED');
    const order = await Order.create({
      userId,
      productId,
      name,
      email,
      phone,
      address,
      paymentMode,
      status: 'pending',
      statusHistory: [{ status: 'pending', changedAt: new Date(), changedBy: userId }],
    });
    console.log('ORDER SAVED', order);
    return NextResponse.json({ message: 'Order placed successfully!', order });
  } catch (error) {
    console.error('ORDER_CREATE_ERROR', error);
    return NextResponse.json({ message: 'Failed to place order.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    let orders;
    if (userId) {
      orders = await Order.find({ userId }).sort({ createdAt: -1 });
    } else {
      orders = await Order.find({}).sort({ createdAt: -1 });
    }
    return NextResponse.json(orders);
  } catch (error) {
    console.error('ORDER_GET_ERROR', error);
    return NextResponse.json({ message: 'Failed to fetch orders.' }, { status: 500 });
  }
} 