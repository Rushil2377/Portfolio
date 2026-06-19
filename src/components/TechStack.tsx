'use client';

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Plus, Trash2 } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface Skill {
  id: string;
  name: string;
  icon: string;
  level: string;
}

export default function TechStack() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } catch (err) {
      console.error('Failed to fetch skills:', err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const skillData = {
      name: formData.get('name') as string,
      icon: formData.get('icon') as string || 'Code',
      level: formData.get('level') as string,
    };

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData),
      });

      if (res.ok) {
        const newSkill = await res.json();
        setSkills(prev => [...prev, newSkill]);
        setIsDialogOpen(false);
        toast({
          title: "Skill Added",
          description: `${newSkill.name} has been added successfully.`,
        });
      } else {
        const err = await res.json();
        toast({
          variant: "destructive",
          title: "Failed to Add Skill",
          description: err.error || "Something went wrong.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to the server.",
      });
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSkills(prev => prev.filter(s => s.id !== id));
        toast({
          title: "Skill Deleted",
          description: "Skill was successfully removed from your tech stack.",
        });
      } else {
        const err = await res.json();
        toast({
          variant: "destructive",
          title: "Failed to Delete",
          description: err.error || "Unauthorized.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to the server.",
      });
    }
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/3">
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
              Technical <span className="text-accent neon-glow">Stack</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Crafting digital experiences with a focus on performance, scalability, and 3D immersion. My tools are selected for their ability to push the boundaries of what's possible on the web.
          </p>

          {isAdmin && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/80 text-black font-bold rounded-full px-8">
                  <Plus className="w-5 h-5 mr-2" /> Add Skill
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-white/10 text-foreground sm:max-w-[400px] bg-black/95">
                <form onSubmit={handleAddSkill}>
                  <DialogHeader>
                    <DialogTitle>Add New Skill</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Specify details for a new skill entry.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Skill Name</Label>
                      <Input id="name" name="name" placeholder="TypeScript, React, etc." className="bg-white/5 border-white/10" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="level">Skill Level / Category</Label>
                      <Input id="level" name="level" placeholder="Expert, Intermediate, Backend" className="bg-white/5 border-white/10" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="icon">Lucide Icon Name</Label>
                      <Input id="icon" name="icon" placeholder="Code, Zap, Cpu, Globe, Database..." className="bg-white/5 border-white/10" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Save Skill</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="w-full md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const IconComponent = (Icons as any)[skill.icon] || Icons.Code;
            return (
              <div 
                key={skill.id}
                className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-accent/40 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                {isAdmin && (
                  <button 
                    onClick={() => deleteSkill(skill.id)}
                    className="absolute top-4 right-4 z-20 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                )}

                <IconComponent className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-headline text-xl font-bold mb-1">{skill.name}</h3>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{skill.level}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
