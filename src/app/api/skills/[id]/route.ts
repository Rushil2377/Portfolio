import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Skill } from '@/models/Skill';
import { getAdminUser } from '@/lib/auth-helper';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized: Admin only' }, { status: 403 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const deleted = await Skill.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (err: any) {
    console.error('Delete skill error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
