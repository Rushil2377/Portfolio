'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Plus, Trash2, ChevronLeft, ChevronRight, Upload, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  desc: string;
  imageHint: string;
  tags: string[];
  span: string;
  githubUrl?: string;
  customImage?: string; // Base64 string for uploaded images
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Aura AI Assistant',
    desc: 'Advanced conversational agent built with Genkit and Gemini, featuring real-time speech-to-text.',
    imageHint: 'artificial intelligence',
    tags: ['Genkit', 'Next.js', 'AI'],
    span: '',
    githubUrl: 'https://github.com/Rushil2377'
  },
  {
    id: 'p2',
    title: 'Vertex 3D Analytics',
    desc: 'Interactive data visualization dashboard using Three.js for complex spatial mapping.',
    imageHint: '3d data',
    tags: ['Three.js', 'React', 'D3.js'],
    span: '',
    githubUrl: 'https://github.com/Rushil2377'
  },
  {
    id: 'p3',
    title: 'SwiftPay Fintech',
    desc: 'Secure payment processing engine with real-time fraud detection and monitoring.',
    imageHint: 'finance technology',
    tags: ['TypeScript', 'Node.js', 'Redis'],
    span: '',
    githubUrl: 'https://github.com/Rushil2377'
  },
  {
    id: 'p4',
    title: 'Nexus CRM',
    desc: 'Enterprise CRM system with automated lead scoring and pipeline analytics.',
    imageHint: 'business dashboard',
    tags: ['PostgreSQL', 'Tailwind', 'Next.js'],
    span: '',
    githubUrl: 'https://github.com/Rushil2377'
  },
  {
    id: 'p5',
    title: 'Lumen CMS',
    desc: 'Headless CMS optimized for edge delivery and global scalability.',
    imageHint: 'content management',
    tags: ['GraphQL', 'Next.js', 'Cloudflare'],
    span: '',
    githubUrl: 'https://github.com/Rushil2377'
  },
  {
    id: 'p6',
    title: 'Echo Chat',
    desc: 'Scalable messaging platform using WebSockets and optimized state sync.',
    imageHint: 'communication technology',
    tags: ['WebSockets', 'Go', 'React'],
    span: '',
    githubUrl: 'https://github.com/Rushil2377'
  }
];

export default function BentoGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    const savedProjects = localStorage.getItem('vertex-projects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        setProjects(parsed.length > 0 ? parsed : DEFAULT_PROJECTS);
      } catch (e) {
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem('vertex-projects', JSON.stringify(DEFAULT_PROJECTS));
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('vertex-projects', JSON.stringify(newProjects));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a JPEG or PNG image.",
      });
      e.target.value = '';
      return;
    }

    // Validate size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Image size must be less than 2MB.",
      });
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      desc: formData.get('desc') as string,
      imageHint: 'custom',
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean),
      span: '',
      githubUrl: 'https://github.com/Rushil2377',
      customImage: base64Image || undefined
    };

    saveProjects([...projects, newProject]);
    setIsDialogOpen(false);
    setBase64Image(null);
    toast({
      title: "Project Added",
      description: `${newProject.title} has been added to your works.`,
    });
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter(p => p.id !== id));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <section id="projects" className="py-24 overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">
            Selected <span className="text-primary">Works</span>
          </h2>
          <div className="h-1 w-24 bg-accent" />
        </div>

        <div className="flex gap-4">
          <div className="hidden md:flex gap-2 mr-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-white/10 hover:bg-white/5"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-white/10 hover:bg-white/5"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setBase64Image(null);
          }}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/80 text-black font-bold rounded-full px-8">
                <Plus className="w-5 h-5 mr-2" /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10 text-foreground sm:max-w-[425px]">
              <form onSubmit={handleAddProject}>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Create a new entry for your portfolio.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="Project Name" className="bg-white/5 border-white/10" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="desc">Description</Label>
                    <Textarea id="desc" name="desc" placeholder="Brief overview..." className="bg-white/5 border-white/10" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" name="tags" placeholder="React, Three.js, AI" className="bg-white/5 border-white/10" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Project Image (PNG/JPEG, Max 2MB)
                    </Label>
                    <div className="relative group">
                      <Input 
                        id="image" 
                        name="image" 
                        type="file" 
                        accept="image/png, image/jpeg" 
                        onChange={handleFileChange}
                        className="bg-white/5 border-white/10 cursor-pointer file:hidden text-xs h-auto py-2"
                      />
                      {base64Image && (
                        <div className="mt-2 relative h-32 w-full rounded-lg overflow-hidden border border-accent/20">
                          <Image src={base64Image} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Save Project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="mx-6 md:mx-12 py-32 text-center border-2 border-dashed border-white/5 rounded-3xl">
          <p className="text-muted-foreground italic">No projects added yet. Click the button above to start your portfolio.</p>
        </div>
      ) : (
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-12 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-accent/20 transition-colors"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="flex-none w-[320px] md:w-[450px] h-[500px] snap-start relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.04] group"
            >
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="icon" 
                  variant="destructive" 
                  className="rounded-full h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(project.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image 
                  src={project.customImage || `https://picsum.photos/seed/${project.id}/800/800`}
                  alt={project.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  unoptimized={!!project.customImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
              </div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-white/10 backdrop-blur-md border-none text-[9px] uppercase tracking-tighter">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-headline text-2xl md:text-3xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-8 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex gap-6 items-center">
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors group/btn">
                    <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" /> 
                    <span>Live Preview</span>
                  </button>
                  <a 
                    href={project.githubUrl || "https://github.com/Rushil2377"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors group/btn"
                  >
                    <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" /> 
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}