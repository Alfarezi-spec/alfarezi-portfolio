"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react"

const roles = [
  "Full Stack Web Developer",
  "Frontend Enthusiast",
  "Backend Explorer",
  "Problem Solver",
  "Continuous Learner",
]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const splineRef = useRef<any>(null)

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6">
        {/* Main Hero Card with Spline */}
        <Card className="w-full min-h-[600px] lg:h-[700px] bg-card border-border relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center">
              {/* Greeting */}
              <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm">
                Hello, I&apos;m
              </p>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Alfarezi Hidayat Pratama
              </h1>

              {/* Typing Effect */}
              <div className="h-10 flex items-center mb-6">
                <span className="text-lg md:text-xl text-muted-foreground">
                  Aspiring{" "}
                  <span className="text-primary font-semibold">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </span>
              </div>

              {/* Tagline */}
              <p className="text-muted-foreground mb-8 max-w-lg text-pretty">
                Learning, building, and improving every day. I am a web development
                student who is passionate about learning and building real-world web
                applications.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 group"
                  asChild
                >
                  <a href="#projects">
                    View Projects
                    <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary gap-2"
                  asChild
                >
                  <a href="#contact">
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="mailto:alfarezihidayat4@gmail.com"
                  className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>

            {/* Right content - 3D Robot */}
            <div className="flex-1 relative min-h-[300px] lg:min-h-0">
              <SplineScene 
                ref={splineRef}
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowDown className="h-6 w-6" />
            <span className="sr-only">Scroll down</span>
          </a>
        </div>
      </div>
    </section>
  )
}
