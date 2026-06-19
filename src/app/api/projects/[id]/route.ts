import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';
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
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (err: any) {
    console.error('Delete project error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
