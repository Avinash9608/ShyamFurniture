import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { sendMail } from '@/lib/mail';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status, changedBy } = await request.json();
    if (!status || !changedBy) {
      return NextResponse.json({ message: 'Status and changedBy are required.' }, { status: 400 });
    }
    await dbConnect();
    const order = await Order.findById(params.id);
    if (!order) {
      return NextResponse.json({ message: 'Order not found.' }, { status: 404 });
    }
    order.status = status;
    order.statusHistory.push({ status, changedAt: new Date(), changedBy });
    await order.save();

    // Send email notification to user
    await sendMail({
      to: order.email,
      subject: `Order Status Updated: ${status}`,
      html: `<p>Your order for <b>${order.name}</b> is now <b>${status}</b>.</p><p>Order ID: ${order._id}</p>`
    });

    return NextResponse.json({ message: 'Order status updated.', order });
  } catch (error) {
    console.error('ORDER_STATUS_UPDATE_ERROR', error);
    return NextResponse.json({ message: 'Failed to update order status.' }, { status: 500 });
  }
} 