"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap, Briefcase, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const education = {
  degree: "Informatics Engineering (RPL)",
  focus: "Currently studying and focusing on web development and software engineering fundamentals.",
}

const experiences = [
  "Developing web-based systems",
  "Learning UML (Use Case, Activity, Sequence, Class Diagram)",
  "Practicing problem-solving through coding",
]

export function Education() {
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
    <section id="education" ref={sectionRef} className="py-24">
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
            My Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Education & Experience
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Education Card */}
          <div
            className={cn(
              "p-8 rounded-2xl bg-card border border-border transition-all duration-700 hover:border-primary/50",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Education</h3>
                <p className="text-sm text-muted-foreground">Current Study</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  {education.degree}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {education.focus}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Currently Enrolled
                </div>
              </div>
            </div>
          </div>

          {/* Experience Card */}
          <div
            className={cn(
              "p-8 rounded-2xl bg-card border border-border transition-all duration-700 delay-150 hover:border-primary/50",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Academic Projects & Self-Learning
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {experiences.map((exp, index) => (
                <div
                  key={exp}
                  className={cn(
                    "flex items-start gap-3 transition-all duration-500",
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{exp}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-muted-foreground italic">
                Building practical experience through hands-on projects and
                continuous self-improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
