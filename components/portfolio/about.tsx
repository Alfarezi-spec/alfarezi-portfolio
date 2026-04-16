"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, BookOpen, Lightbulb, Target } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Building both frontend and backend applications",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Always exploring new technologies and best practices",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Developing logical thinking through coding challenges",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Working towards becoming a professional developer",
  },
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm">
              Get To Know
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About Text */}
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I am an Informatics Engineering student with a strong interest in
                web development. Currently, I am still in the learning phase and
                continuously improving my skills in both frontend and backend
                development.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I enjoy exploring new technologies, building small projects, and
                understanding how systems work behind the scenes. I have worked on
                several academic and personal projects such as web-based systems
                and CRUD applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through these experiences, I am developing problem-solving skills,
                logical thinking, and a deeper understanding of software
                development. My goal is to grow into a professional developer and
                contribute to meaningful and impactful projects in the future.
              </p>

              {/* Personal Statement */}
              <blockquote className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg">
                <p className="text-foreground italic">
                  &ldquo;I believe that consistency and continuous learning are the keys
                  to becoming a better developer. I may still be at the learning
                  stage, but I am committed to improving my skills and building
                  real, useful projects step by step.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                  }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
