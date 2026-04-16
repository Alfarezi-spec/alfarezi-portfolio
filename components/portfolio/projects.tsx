"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Project {
  title: string
  description: string
  learnings: string[]
  techStack: string[]
  image?: string
}

const projects: Project[] = [
  {
    title: "E-Learning Web Application",
    description:
      "A web-based learning platform developed as part of my academic project to manage interaction between teachers and students.",
    learnings: [
      "Authentication system",
      "Role management",
      "Database structuring",
    ],
    techStack: ["PHP", "CodeIgniter 4", "MySQL", "Bootstrap"],
  },
  {
    title: "Library Management System",
    description: "A system to manage books and borrowing processes.",
    learnings: ["CRUD operations", "Database design", "Backend logic"],
    techStack: ["PHP", "MySQL"],
  },
  {
    title: "Chat System",
    description:
      "A basic messaging system for communication between users.",
    learnings: [
      "Data flow handling",
      "Chat storage",
      "Interaction concepts",
    ],
    techStack: ["PHP", "JavaScript", "MySQL"],
  },
]

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: Project
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:-translate-y-2",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Project Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold text-primary/20">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="ghost"
            className="bg-background/20 hover:bg-background/40 text-white"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">View source code</span>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="bg-background/20 hover:bg-background/40 text-white"
          >
            <ExternalLink className="h-5 w-5" />
            <span className="sr-only">View live project</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Learnings */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2 text-sm font-medium">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>What I Learned</span>
          </div>
          <ul className="space-y-1">
            {project.learnings.map((learning) => (
              <li
                key={learning}
                className="text-sm text-muted-foreground flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {learning}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm">
            My Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some projects I&apos;ve worked on during my learning journey.
            Each project helped me develop new skills and understand different
            aspects of web development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* More Projects CTA */}
        <div
          className={cn(
            "text-center mt-12 transition-all duration-700 delay-500",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              View More on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
