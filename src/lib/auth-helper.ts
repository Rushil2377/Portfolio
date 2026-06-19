import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_vertex_portfolio_admin_2026';

export async function getAuthenticatedUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;

    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (decoded?.id && decoded?.email && decoded?.role) {
      return decoded;
    }
  } catch (err) {
    return null;
  }
  return null;
}

export async function getAdminUser() {
  const user = await getAuthenticatedUser();
  if (user?.role === 'admin') {
    return user;
  }
  return null;
}
