import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Otp } from '@/models/Otp';
import { generateOtp, sendOtpEmail } from '@/lib/otp-helper';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const otp = generateOtp();

    // Store the login OTP in the temporary Otp collection
    await Otp.findOneAndUpdate(
      { email: email.toLowerCase(), type: 'login' },
      {
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
      { upsert: true, new: true }
    );

    // Send the OTP via email
    const emailResult = await sendOtpEmail(email.toLowerCase(), otp, 'login');
    if (!emailResult.success) {
      return NextResponse.json({ error: 'Failed to send verification email. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'OTP sent successfully. Please check your email.',
      requiresOtp: true,
      email: email.toLowerCase(),
    }, { status: 200 });

  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
