'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'Nexus Data Engine',
    desc: 'High-performance real-time data streaming platform built with Rust and Next.js.',
    image: PlaceHolderImages[0],
    tags: ['Rust', 'Next.js', 'WebSockets'],
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Ethereal UI',
    desc: 'A futuristic component library focused on glassmorphism and 3D depth.',
    image: PlaceHolderImages[1],
    tags: ['Tailwind', 'Framer', 'Three.js'],
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    title: 'Cipher Hub',
    desc: 'Decentralized identity management system with biometric encryption.',
    image: PlaceHolderImages[2],
    tags: ['Blockchain', 'Biometrics', 'Auth'],
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Orbit Analytics',
    desc: 'Interactive 3D visualization dashboard for satellite telemetry data.',
    image: PlaceHolderImages[3],
    tags: ['D3.js', 'Three.js', 'Python'],
    span: 'md:col-span-1 md:row-span-1',
  },
];

export default function BentoGrid() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          Selected <span className="text-primary">Works</span>
        </h2>
        <div className="h-1 w-24 bg-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index}
            className={`bento-item group ${project.span} flex flex-col`}
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image 
                src={project.image.imageUrl}
                alt={project.title}
                width={800}
                height={600}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                data-ai-hint={project.image.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-end">
              <div className="flex gap-2 mb-4">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-white/5 border-none text-[10px] uppercase tracking-tighter">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="font-headline text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                {project.desc}
              </p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </button>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">
                  <Github className="w-4 h-4" /> Codebase
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
