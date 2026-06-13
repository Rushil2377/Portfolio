import ThreeHero from '@/components/ThreeHero';
import TechStack from '@/components/TechStack';
import BentoGrid from '@/components/BentoGrid';
import CaseStudyTool from '@/components/CaseStudyTool';
import ContactHub from '@/components/ContactHub';
import ResumeDialog from '@/components/ResumeDialog';
import { Toaster } from '@/components/ui/toaster';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Toaster />
      
      {/* Navigation Overlay */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <div className="font-headline font-bold text-2xl tracking-tighter text-white">
          VERTEX<span className="text-accent">.</span>
        </div>
        <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.3em] font-bold text-white/70">
          <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
          <a href="#ai-tool" className="hover:text-accent transition-colors">AI Lab</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </div>
        <ResumeDialog />
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <ThreeHero />
        
        <div className="z-10 text-center max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Available for new projects
          </div>
          
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-[0.9]">
            ENGINEERING <br />
            <span className="italic font-light">DIGITAL</span> DEPTH.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            I am <span className="text-white font-bold">Marvaniya Rusiljumar P.</span>, a CSE Engineer specializing in high-performance web experiences and technical architecture.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-16 px-12 text-lg group rounded-full">
              Explore Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 bg-white/5 backdrop-blur-md text-white font-bold h-16 px-12 text-lg rounded-full hover:bg-white/10 transition-colors">
              The AI Lab
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to navigate</span>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 space-y-32 bg-background">
        <TechStack />
        <BentoGrid />
        <CaseStudyTool />
        <ContactHub />
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}