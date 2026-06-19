import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_vertex_portfolio_admin_2026';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      return NextResponse.json({
        user: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        },
      });
    } catch (jwtErr) {
      // Invalid/expired token: clear cookie
      const response = NextResponse.json({ user: null });
      response.cookies.set({
        name: 'token',
        value: '',
        httpOnly: true,
        maxAge: 0,
        path: '/',
      });
      return response;
    }
  } catch (err: any) {
    console.error('Auth check error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
