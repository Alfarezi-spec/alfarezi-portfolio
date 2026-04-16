"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type SkillLevel = "Basic" | "Intermediate" | "Learning"

interface Skill {
  name: string
  level: SkillLevel
  percentage: number
}

interface SkillCategory {
  title: string
  icon: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "HTML5", level: "Intermediate", percentage: 70 },
      { name: "CSS3", level: "Intermediate", percentage: 65 },
      { name: "JavaScript", level: "Basic", percentage: 45 },
      { name: "Bootstrap", level: "Intermediate", percentage: 60 },
      { name: "Tailwind CSS", level: "Learning", percentage: 35 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "PHP", level: "Intermediate", percentage: 65 },
      { name: "CodeIgniter 4", level: "Learning", percentage: 40 },
      { name: "MySQL", level: "Intermediate", percentage: 60 },
    ],
  },
  {
    title: "Tools & Others",
    icon: "🛠️",
    skills: [
      { name: "Git & GitHub", level: "Basic", percentage: 45 },
      { name: "VS Code", level: "Intermediate", percentage: 80 },
      { name: "Figma", level: "Basic", percentage: 35 },
      { name: "REST API", level: "Learning", percentage: 30 },
    ],
  },
]

const levelColors: Record<SkillLevel, string> = {
  Basic: "bg-yellow-500/20 text-yellow-500",
  Intermediate: "bg-primary/20 text-primary",
  Learning: "bg-blue-500/20 text-blue-500",
}

function SkillBar({
  skill,
  isVisible,
  delay,
}: {
  skill: Skill
  isVisible: boolean
  delay: number
}) {
  return (
    <div
      className="space-y-2"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-20px)",
        transition: "all 0.5s ease-out",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{skill.name}</span>
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium",
            levelColors[skill.level]
          )}
        >
          {skill.level}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${skill.percentage}%` : "0%",
            transitionDelay: `${delay + 200}ms`,
          }}
        />
      </div>
    </div>
  )
}

export function Skills() {
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
    <section id="skills" ref={sectionRef} className="py-24">
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
            What I Know
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={cn(
                "p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDelay: `${categoryIndex * 150}ms`,
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    isVisible={isVisible}
                    delay={categoryIndex * 150 + skillIndex * 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-6 mt-12 transition-all duration-700 delay-500",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm text-muted-foreground">Basic</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Learning</span>
          </div>
        </div>
      </div>
    </section>
  )
}
