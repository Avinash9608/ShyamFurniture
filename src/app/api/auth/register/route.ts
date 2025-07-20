import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { sendMail } from '@/lib/mail';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    await dbConnect();
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email or username already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpires,
      role: 'user',
    });

    // Send OTP email
    await sendMail({
      to: email,
      subject: 'Verify your email - Shyam Furniture',
      html: `<p>Your OTP for registration is: <b>${otp}</b></p><p>This code is valid for 10 minutes.</p>`
    });

    return NextResponse.json({ message: 'Registration successful. Please check your email for the OTP.' });
  } catch (error) {
    console.error('REGISTER_ERROR', error);
    return NextResponse.json({ message: 'Registration failed.' }, { status: 500 });
  }
} 