import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Otp } from '@/models/Otp';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_vertex_portfolio_admin_2026';

export async function POST(req: Request) {
  try {
    const { email, otp, type } = await req.json();

    if (!email || !otp || !type) {
      return NextResponse.json({ error: 'Email, OTP, and verification type are required' }, { status: 400 });
    }

    if (type !== 'register' && type !== 'login') {
      return NextResponse.json({ error: 'Invalid verification type' }, { status: 400 });
    }

    await connectToDatabase();

    // Query active and valid OTP code
    const otpDoc = await Otp.findOne({
      email: email.toLowerCase(),
      type,
      expiresAt: { $gt: new Date() },
    });

    if (!otpDoc) {
      return NextResponse.json({ error: 'Verification code has expired or is invalid. Please request a new one.' }, { status: 400 });
    }

    if (otpDoc.otp !== otp) {
      return NextResponse.json({ error: 'Invalid verification code.' }, { status: 400 });
    }

    let user;

    if (type === 'register') {
      // Double check that the user wasn't registered in parallel
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        await Otp.deleteOne({ _id: otpDoc._id });
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }

      if (!otpDoc.passwordHash) {
        return NextResponse.json({ error: 'Invalid registration state. Please register again.' }, { status: 400 });
      }

      // Create new user
      user = await User.create({
        email: email.toLowerCase(),
        password: otpDoc.passwordHash,
        role: 'user',
      });
    } else {
      // Find existing user for login verification
      user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return NextResponse.json({ error: 'User account not found.' }, { status: 404 });
      }
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      message: type === 'register' ? 'Registered and logged in successfully' : 'Logged in successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

    // Set HTTP-only Cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/',
    });

    // Delete verified OTP doc
    await Otp.deleteOne({ _id: otpDoc._id });

    return response;

  } catch (err: any) {
    console.error('OTP verification error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
