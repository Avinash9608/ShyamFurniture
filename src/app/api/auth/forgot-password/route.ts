import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { sendMail } from '@/lib/mail';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'If the email exists, an OTP will be sent.' }); // Do not reveal user existence
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendMail({
      to: email,
      subject: 'Reset your password - Shyam Furniture',
      html: `<p>Your OTP for password reset is: <b>${otp}</b></p><p>This code is valid for 10 minutes.</p>`
    });

    return NextResponse.json({ message: 'If the email exists, an OTP will be sent.' });
  } catch (error) {
    console.error('FORGOT_PASSWORD_ERROR', error);
    return NextResponse.json({ message: 'Failed to send OTP.' }, { status: 500 });
  }
} 