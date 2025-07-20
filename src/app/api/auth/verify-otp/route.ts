import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required.' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }
    if (user.isVerified) {
      return NextResponse.json({ message: 'User already verified.' }, { status: 400 });
    }
    if (!user.otp || !user.otpExpires || user.otp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP.' }, { status: 400 });
    }
    if (user.otpExpires < new Date()) {
      return NextResponse.json({ message: 'OTP has expired.' }, { status: 400 });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('VERIFY_OTP_ERROR', error);
    return NextResponse.json({ message: 'OTP verification failed.' }, { status: 500 });
  }
} 