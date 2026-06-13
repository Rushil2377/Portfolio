
'use client';

import React from 'react';
import { Cpu, Globe, Database, Layers, Code, Zap } from 'lucide-react';

const skills = [
  { name: 'TypeScript', icon: Code, level: 'Expert' },
  { name: 'React/Next.js', icon: Zap, level: 'Advanced' },
  { name: 'Three.js', icon: Cpu, level: 'Specialist' },
  { name: 'Node.js', icon: Globe, level: 'Backend' },
  { name: 'PostgreSQL', icon: Database, level: 'Data' },
  { name: 'Cloud Infra', icon: Layers, level: 'DevOps' },
];

export default function TechStack() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/3">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Technical <span className="text-accent neon-glow">Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Crafting digital experiences with a focus on performance, scalability, and 3D immersion. My tools are selected for their ability to push the boundaries of what's possible on the web.
          </p>
        </div>
        <div className="w-full md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-accent/40 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <skill.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-headline text-xl font-bold mb-1">{skill.name}</h3>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{skill.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
