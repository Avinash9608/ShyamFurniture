import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, otp, newPassword } = await request.json();
    if (!email || !otp || !newPassword) {
      return NextResponse.json({ message: 'Email, OTP, and new password are required.' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
    }
    if (!user.otp || !user.otpExpires || user.otp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP.' }, { status: 400 });
    }
    if (user.otpExpires < new Date()) {
      return NextResponse.json({ message: 'OTP has expired.' }, { status: 400 });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return NextResponse.json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    console.error('RESET_PASSWORD_ERROR', error);
    return NextResponse.json({ message: 'Password reset failed.' }, { status: 500 });
  }
} 