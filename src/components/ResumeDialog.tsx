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
    'Creative Problem Solving',
    'Strong Team Collaborator',
    'Adaptive Engineering'
  ];

  const languages = [
    'English (Professional)',
    'Hindi (Native)',
    'Gujarati (Native)'
  ];

  const certificates = [
    'Full Stack Web Development - Coursera',
    'JavaScript Algorithms & Data Structures - freeCodeCamp',
    'Java Masterclass - Udemy',
    'Cloud Architecture Foundations'
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
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
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
      <DialogContent className="max-w-4xl max-h-[95vh] bg-card border-white/10 p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Marvaniya Rusilkumar P. - Resume</DialogTitle>
          <DialogDescription>Full professional resume of Marvaniya Rusilkumar P. in A4 format.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-full max-h-[85vh]">
          <div ref={resumeRef} className="w-full min-h-[1123px] p-10 md:p-16 space-y-12 bg-card text-foreground">
            {/* Header / Contact Information */}
            <header className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-12">
              <div className="space-y-4">
                <h1 className="font-headline text-5xl font-bold tracking-tighter">
                  Marvaniya Rusilkumar P.
                </h1>
                <p className="text-accent text-xl font-medium tracking-wide">Computer Science Engineer & Full-stack Architect</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm text-muted-foreground pt-4">
                  <a href="mailto:rushilmarvaniya@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-accent" /> rushilmarvaniya@gmail.com
                  </a>
                  <a href="tel:+919558415136" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-accent" /> +91 9558415136
                  </a>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Vadodara,+Gujarat,+India" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-accent" /> Vadodara, Gujarat, India
                  </a>
                  <a 
                    href="https://github.com/Rushil2377" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-accent" /> github.com/Rushil2377
                  </a>
                </div>
              </div>
              <div className="flex gap-4 no-pdf">
                <a href="https://github.com/Rushil2377" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="rounded-full w-12 h-12 border-white/10 hover:border-accent hover:bg-accent/5">
                    <Github className="w-5 h-5" />
                  </Button>
                </a>
                <Button size="icon" variant="outline" className="rounded-full w-12 h-12 border-white/10 hover:border-accent hover:bg-accent/5">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              {/* Left Column */}
              <div className="md:col-span-4 space-y-12">
                <section>
                  <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <User className="w-4 h-4 text-accent" /> Profile
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Highly motivated Computer Science Engineering student with a deep passion for building high-performance, scalable web applications. Expert in modern JavaScript frameworks and database architectures.
                  </p>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" /> Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-white/5 border-white/10 px-3 py-1.5 text-xs font-semibold">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-accent" /> Languages
                  </h3>
                  <ul className="space-y-3">
                    {languages.map(lang => (
                      <li key={lang} className="text-sm text-muted-foreground flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(77,224,255,0.5)]" />
                        {lang}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6 flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" /> Certificates
                  </h3>
                  <div className="space-y-4">
                    {certificates.map(cert => (
                      <div key={cert} className="group">
                        <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                          • {cert}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="md:col-span-8 space-y-12">
                <section>
                  <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground mb-8 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accent" /> Work Experience & Professional Projects
                  </h3>
                  <div className="space-y-10">
                    <div className="relative pl-8 border-l-2 border-white/5">
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-accent -translate-x-[7.5px] border-2 border-card shadow-[0_0_10px_rgba(77,224,255,0.4)]" />
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-foreground">Vertex Studio Portfolio</h4>
                        <span className="text-xs text-accent font-medium">2026</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium mb-3 uppercase tracking-wider">Lead Developer</p>
                      <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside marker:text-accent">
                        <li>Developed a high-end interactive portfolio using Next.js 15 and Three.js.</li>
                        <li>Implemented complex 3D shader interactions and custom vertex geometries.</li>
                        <li>Built an AI-driven case study generator using Genkit and Gemini 1.5.</li>
                      </ul>
                    </div>

                    <div className="relative pl-8 border-l-2 border-white/5">
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-white/20 -translate-x-[7.5px] border-2 border-card" />
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-foreground">Database Management System</h4>
                        <span className="text-xs text-muted-foreground">2025</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium mb-3 uppercase tracking-wider">Core Contributor</p>
                      <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside marker:text-accent/40">
                        <li>Engineered a full-stack resource management system for academic departments.</li>
                        <li>Integrated MySQL with Node.js to handle over 5,000 concurrent record entries.</li>
                        <li>Reduced query response times by 40% through advanced SQL normalization.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground mb-8 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-accent" /> Education
                  </h3>
                  <div className="relative pl-8 border-l-2 border-accent/20">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-accent -translate-x-[7.5px] border-2 border-card" />
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-foreground">B.E. Computer Science Engineering</h4>
                        <p className="text-sm text-muted-foreground italic">Maharaja Sayajirao University (MSU) of Baroda</p>
                      </div>
                      <span className="text-sm font-bold text-accent whitespace-nowrap">2024 — Present</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground mb-8 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" /> Key Skills & Engineering Strengths
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {strengths.map(strength => (
                      <div key={strength} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all group">
                        <p className="text-xs font-bold text-muted-foreground group-hover:text-accent transition-colors">
                          {strength}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-white/5 bg-black/60 backdrop-blur-md flex justify-center no-pdf">
          <Button 
            onClick={handleDownload}
            disabled={isDownloading}
            size="lg"
            className="bg-accent hover:bg-accent/80 text-black font-bold rounded-full px-12 shadow-[0_0_20px_rgba(77,224,255,0.2)]"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                Generating A4 PDF...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-3" />
                Download Full Resume
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
