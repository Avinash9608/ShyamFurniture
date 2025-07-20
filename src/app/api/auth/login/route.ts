import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
    if (!user.isVerified) {
      return NextResponse.json({ message: 'Please verify your email before logging in.' }, { status: 403 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    const token = signJwt({ userId: user._id, email: user.email });
    return NextResponse.json({ token, user: { _id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    console.error('LOGIN_ERROR', error);
    return NextResponse.json({ message: 'Login failed.' }, { status: 500 });
  }
} 