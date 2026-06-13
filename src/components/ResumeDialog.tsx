'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  ExternalLink,
  Github,
  Linkedin
} from 'lucide-react';

export default function ResumeDialog() {
  const skills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 
    'MySQL', 'HTML', 'CSS', 'Java', 'C', 'C++'
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white/20 text-white rounded-full px-6 hover:bg-white hover:text-black transition-all">
          <FileText className="w-4 h-4 mr-2" />
          Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card border-white/10 p-0 overflow-hidden">
        {/* Accessibility Requirements */}
        <DialogHeader className="sr-only">
          <DialogTitle>Marvaniya Rusilkumar P. - Resume</DialogTitle>
          <DialogDescription>
            Professional background, education, and technical skills of Marvaniya Rusilkumar P., a Computer Science Engineer.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-8 md:p-12 space-y-12">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/5 pb-12">
              <div>
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                  Marvaniya Rusilkumar P.
                </h1>
                <p className="text-accent text-lg font-medium">Computer Science Engineer & Full-stack Developer</p>
                <div className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> rusilkumar.p@example.com</span>
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Vadodara, Gujarat</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="rounded-full border-white/10 hover:bg-white/10">
                  <Github className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full border-white/10 hover:bg-white/10">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Left Column */}
              <div className="md:col-span-1 space-y-12">
                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-white/5 border-white/10 px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-accent" /> Education
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-sm">B.E. Computer Science</h4>
                      <p className="text-xs text-muted-foreground">Maharaja Sayajirao University (MSU)</p>
                      <p className="text-xs text-accent mt-1">2021 — Present</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accent" /> Projects & Experience
                  </h3>
                  <div className="space-y-8">
                    <div className="relative pl-6 border-l border-white/5">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-accent -translate-x-[4.5px]" />
                      <h4 className="font-bold">Vertex Studio Portfolio</h4>
                      <p className="text-xs text-muted-foreground mb-3">Personal Branding • 2024</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Developed a high-end 3D portfolio using Next.js 15, Three.js, and GenAI. Features interactive vertex geometry and AI-powered technical writing tools.
                      </p>
                    </div>

                    <div className="relative pl-6 border-l border-white/5">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-accent -translate-x-[4.5px]" />
                      <h4 className="font-bold">Full-stack Management System</h4>
                      <p className="text-xs text-muted-foreground mb-3">Academic Project • 2023</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Built a robust backend using Node.js and MySQL to manage large datasets for university resource allocation. Optimized query performance by 40%.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6">Summary</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Dedicated CSE student at MSU with a deep passion for building scalable web applications. Expert in modern JavaScript frameworks and systems-level programming with C/C++. Committed to writing clean, maintainable code and exploring the intersection of AI and Web3D.
                  </p>
                </section>
              </div>
            </div>

            <footer className="pt-8 border-t border-white/5 text-center">
              <Button className="bg-accent hover:bg-accent/90 text-black font-bold rounded-full px-8">
                Download PDF
              </Button>
            </footer>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
