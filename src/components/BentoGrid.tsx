
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Plus, Trash2 } from 'lucide-react';
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

interface Project {
  id: string;
  title: string;
  desc: string;
  imageHint: string;
  tags: string[];
  span: string;
}

export default function BentoGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedProjects = localStorage.getItem('vertex-projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Failed to parse projects', e);
      }
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('vertex-projects', JSON.stringify(newProjects));
  };

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      desc: formData.get('desc') as string,
      imageHint: (formData.get('imageHint') as string) || 'technology',
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean),
      span: projects.length % 3 === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1',
    };

    saveProjects([...projects, newProject]);
    setIsDialogOpen(false);
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter(p => p.id !== id));
  };

  if (!mounted) return null;

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">
            Selected <span className="text-primary">Works</span>
          </h2>
          <div className="h-1 w-24 bg-accent" />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  <Label htmlFor="imageHint">Image Theme (e.g. "cyberpunk", "code")</Label>
                  <Input id="imageHint" name="imageHint" placeholder="minimalist" className="bg-white/5 border-white/10" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Save Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-3xl">
          <p className="text-muted-foreground italic">No projects added yet. Click the button above to start your portfolio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`bento-item group ${project.span} flex flex-col group relative`}
            >
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="icon" 
                  variant="destructive" 
                  className="rounded-full h-8 w-8"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="relative flex-grow w-full overflow-hidden">
                <Image 
                  src={`https://picsum.photos/seed/${project.id}/800/800`}
                  alt={project.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint={project.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
              </div>
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-white/10 backdrop-blur-md border-none text-[9px] uppercase tracking-tighter">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-headline text-xl md:text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mb-6">
                  {project.desc}
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors">
                    <ExternalLink className="w-3 h-3" /> Live
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors">
                    <Github className="w-3 h-3" /> Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
