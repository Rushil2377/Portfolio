import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Skill } from '@/models/Skill';
import { getAdminUser } from '@/lib/auth-helper';

const SEED_SKILLS = [
  { name: 'TypeScript', icon: 'Code', level: 'Expert' },
  { name: 'React/Next.js', icon: 'Zap', level: 'Advanced' },
  { name: 'Three.js', icon: 'Cpu', level: 'learner' },
  { name: 'Node.js', icon: 'Globe', level: 'Backend' },
  { name: 'MySQL', icon: 'Database', level: 'Data' },
  { name: 'Cloud Infra', icon: 'Layers', level: 'DevOps' }
];

export async function GET() {
  try {
    await connectToDatabase();
    let skills = await Skill.find({}).sort({ createdAt: 1 });

    // Seed default skills if none exist
    if (skills.length === 0) {
      await Skill.insertMany(SEED_SKILLS);
      skills = await Skill.find({}).sort({ createdAt: 1 });
    }

    const formatted = skills.map(s => ({
      id: s._id.toString(),
      name: s.name,
      icon: s.icon,
      level: s.level
    }));

    return NextResponse.json(formatted);
  } catch (err: any) {
    console.error('Fetch skills error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized: Admin only' }, { status: 403 });
    }

    const { name, icon, level } = await req.json();

    if (!name || !level) {
      return NextResponse.json({ error: 'Name and Level are required' }, { status: 400 });
    }

    await connectToDatabase();

    const newSkill = await Skill.create({
      name,
      icon: icon || 'Code',
      level
    });

    return NextResponse.json({
      id: newSkill._id.toString(),
      name: newSkill.name,
      icon: newSkill.icon,
      level: newSkill.level
    }, { status: 201 });

  } catch (err: any) {
    console.error('Create skill error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
