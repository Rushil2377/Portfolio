import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { getAdminUser } from '@/lib/auth-helper';

const SEED_PROJECTS = [
  {
    title: 'Aura AI Assistant',
    desc: 'Advanced conversational agent built with Genkit and Gemini, featuring real-time speech-to-text.',
    imageHint: 'artificial intelligence',
    tags: ['Genkit', 'Next.js', 'AI'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Vertex 3D Analytics',
    desc: 'Interactive data visualization dashboard using Three.js for complex spatial mapping.',
    imageHint: '3d data',
    tags: ['Three.js', 'React', 'D3.js'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'SwiftPay Fintech',
    desc: 'Secure payment processing engine with real-time fraud detection and monitoring.',
    imageHint: 'finance technology',
    tags: ['TypeScript', 'Node.js', 'Redis'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Nexus CRM',
    desc: 'Enterprise CRM system with automated lead scoring and pipeline analytics.',
    imageHint: 'business dashboard',
    tags: ['PostgreSQL', 'Tailwind', 'Next.js'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Lumen CMS',
    desc: 'Headless CMS optimized for edge delivery and global scalability.',
    imageHint: 'content management',
    tags: ['GraphQL', 'Next.js', 'Cloudflare'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Echo Chat',
    desc: 'Scalable messaging platform using WebSockets and optimized state sync.',
    imageHint: 'communication technology',
    tags: ['WebSockets', 'Go', 'React'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Titan Blockchain',
    desc: 'Decentralized identity protocol for secure enterprise asset management.',
    imageHint: 'blockchain technology',
    tags: ['Solidity', 'Web3.js', 'Ethereum'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Orbital Tracker',
    desc: 'Real-time satellite tracking and debris mapping system for space agencies.',
    imageHint: 'satellite space',
    tags: ['Python', 'WebGL', 'AWS'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Holos AR Mesh',
    desc: 'Mobile AR application for real-time interior design and spatial 3D mapping.',
    imageHint: 'augmented reality',
    tags: ['Unity', 'ARCore', 'C#'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Pulse IoT Grid',
    desc: 'Industrial IoT monitoring system with predictive maintenance algorithms.',
    imageHint: 'industrial internet',
    tags: ['MQTT', 'InfluxDB', 'React'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Glacier Search',
    desc: 'High-performance vector database search engine for unstructured medical data.',
    imageHint: 'vector database',
    tags: ['Rust', 'Vector DB', 'gRPC'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  },
  {
    title: 'Cipher Vault',
    desc: 'Quantum-resistant encryption layer for distributed cloud storage architectures.',
    imageHint: 'cyber security',
    tags: ['Cryptography', 'C++', 'Azure'],
    span: '',
    previewUrl: 'https://github.com/Rushil2377'
  }
];

export async function GET() {
  try {
    await connectToDatabase();
    let projects = await Project.find({}).sort({ createdAt: -1 });

    // Seed default projects if none exist
    if (projects.length === 0) {
      await Project.insertMany(SEED_PROJECTS);
      projects = await Project.find({}).sort({ createdAt: -1 });
    }

    // Map _id to id for client convenience
    const formatted = projects.map(p => ({
      id: p._id.toString(),
      title: p.title,
      desc: p.desc,
      imageHint: p.imageHint,
      tags: p.tags,
      span: p.span,
      previewUrl: p.previewUrl,
      customImage: p.customImage
    }));

    return NextResponse.json(formatted);
  } catch (err: any) {
    console.error('Fetch projects error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized: Admin only' }, { status: 403 });
    }

    const { title, desc, imageHint, tags, previewUrl, customImage } = await req.json();

    if (!title || !desc) {
      return NextResponse.json({ error: 'Title and Description are required' }, { status: 400 });
    }

    await connectToDatabase();

    const newProject = await Project.create({
      title,
      desc,
      imageHint: imageHint || 'custom',
      tags: tags || [],
      previewUrl: previewUrl || '',
      customImage: customImage || ''
    });

    return NextResponse.json({
      id: newProject._id.toString(),
      title: newProject.title,
      desc: newProject.desc,
      imageHint: newProject.imageHint,
      tags: newProject.tags,
      span: newProject.span,
      previewUrl: newProject.previewUrl,
      customImage: newProject.customImage
    }, { status: 201 });

  } catch (err: any) {
    console.error('Create project error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
