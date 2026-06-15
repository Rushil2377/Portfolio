'use client';

import React, { useRef, useState } from 'react';
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
  Github,
  Linkedin,
  Download,
  Loader2,
  Trophy,
  Zap,
  Phone,
  Languages,
  Award,
  User
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumeDialog() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const skills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 
    'MySQL', 'HTML', 'CSS', 'Java', 'C', 'C++'
  ];

  const strengths = [
    'Analytical Mindset',
    'Quick Learner',
    'Attention to Detail',
    'Creative Problem Solving'
  ];

  const languages = [
    'English (Professional)',
    'Hindi (Native)',
    'Gujarati (Native)'
  ];

  const certificates = [
    'Full Stack Web Development - Coursera',
    'JavaScript Algorithms - freeCodeCamp',
    'Java Masterclass - Udemy'
  ];

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);

    try {
      const element = resumeRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0a0b14',
        logging: false,
        ignoreElements: (el) => el.classList.contains('no-pdf'),
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Marvaniya_Rusilkumar_Resume.pdf');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white/20 text-white rounded-full px-6 hover:bg-white hover:text-black transition-all">
          <FileText className="w-4 h-4 mr-2" />
          Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card border-white/10 p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Marvaniya Rusilkumar P. - Resume</DialogTitle>
          <DialogDescription>Professional portfolio and experience of Marvaniya Rusilkumar P.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-full max-h-[90vh]">
          <div ref={resumeRef} className="p-8 md:p-12 space-y-12 bg-card text-foreground">
            {/* Header / Contact Info */}
            <header className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/5 pb-12">
              <div>
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                  Marvaniya Rusilkumar P.
                </h1>
                <p className="text-accent text-lg font-medium">Computer Science Engineer & Full-stack Developer</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> rusilmarvaniya@gmail.com</span>
                  <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 9558415136</span>
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Vadodara, Gujarat</span>
                  <span className="flex items-center gap-2"><Github className="w-4 h-4" /> github.com/Rushil2377</span>
                </div>
              </div>
              <div className="flex gap-3 no-pdf">
                <a href="https://github.com/Rushil2377" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="rounded-full border-white/10 hover:bg-white/10">
                    <Github className="w-4 h-4" />
                  </Button>
                </a>
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
                    <User className="w-4 h-4 text-accent" /> Profile
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Motivated Computer Science Engineering student with a strong foundation in full-stack development. Passionate about creating efficient, scalable solutions and intuitive user experiences.
                  </p>
                </section>

                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" /> Skill Set
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
                    <Languages className="w-4 h-4 text-accent" /> Languages
                  </h3>
                  <ul className="space-y-2">
                    {languages.map(lang => (
                      <li key={lang} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-accent" />
                        {lang}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" /> Certificates
                  </h3>
                  <ul className="space-y-3">
                    {certificates.map(cert => (
                      <li key={cert} className="text-xs text-muted-foreground italic leading-relaxed">
                        • {cert}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Right Column */}
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-accent" /> Education
                  </h3>
                  <div className="space-y-4">
                    <div className="relative pl-6 border-l border-white/5">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-accent -translate-x-[4.5px]" />
                      <h4 className="font-bold">B.E. Computer Science Engineering</h4>
                      <p className="text-xs text-muted-foreground">Maharaja Sayajirao University (MSU) of Baroda</p>
                      <p className="text-xs text-accent mt-1">2024 — Present</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accent" /> Projects & Work Experience
                  </h3>
                  <div className="space-y-8">
                    <div className="relative pl-6 border-l border-white/5">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-accent -translate-x-[4.5px]" />
                      <h4 className="font-bold">Vertex Studio Portfolio</h4>
                      <p className="text-xs text-muted-foreground mb-2">Lead Developer • 2024</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                        <li>Architected a 3D interactive portfolio using Next.js 15 and Three.js.</li>
                        <li>Integrated GenAI for automated case study drafting.</li>
                        <li>Implemented dynamic PDF resume generation with client-side rendering.</li>
                      </ul>
                    </div>

                    <div className="relative pl-6 border-l border-white/5">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-accent -translate-x-[4.5px]" />
                      <h4 className="font-bold">Database Management System</h4>
                      <p className="text-xs text-muted-foreground mb-2">Project Collaborator • 2023</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                        <li>Designed a relational database for university resources using MySQL.</li>
                        <li>Built a Node.js management API with full CRUD operations.</li>
                        <li>Optimized data retrieval speed by 35% through proper indexing.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" /> Key Skills & Abilities
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {strengths.map(ability => (
                      <div key={ability} className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-center hover:border-accent transition-colors">
                        {ability}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <footer className="pt-8 border-t border-white/5 text-center no-pdf">
              <Button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="bg-accent hover:bg-accent/80 text-black font-bold rounded-full px-8"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </footer>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
