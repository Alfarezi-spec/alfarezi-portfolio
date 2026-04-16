"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Calendar, ExternalLink, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Certificate {
  title: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
  skills: string[]
  description?: string
}

const certificates: Certificate[] = [
  {
    title: "Web Development Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "2024",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    description: "Comprehensive course covering the fundamentals of web development including HTML5, CSS3, and JavaScript basics.",
  },
  {
    title: "Backend Development with Node.js",
    issuer: "Dicoding Indonesia",
    date: "2024",
    skills: ["Node.js", "Express.js", "REST API", "Database"],
    description: "Learning backend development concepts using Node.js and Express framework.",
  },
  {
    title: "PHP Programming Basics",
    issuer: "Universitas",
    date: "2023",
    skills: ["PHP", "MySQL", "CRUD Operations"],
    description: "Academic certification in PHP programming and database management.",
  },
  {
    title: "Database Management Systems",
    issuer: "Universitas",
    date: "2023",
    skills: ["SQL", "MySQL", "Database Design", "Normalization"],
    description: "Understanding relational database concepts and SQL query optimization.",
  },
]

function CertificateCard({
  certificate,
  index,
  isVisible,
}: {
  certificate: Certificate
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl border border-border p-6 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Certificate Icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Award className="h-6 w-6" />
        </div>
        {certificate.credentialUrl && (
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">View credential</span>
            </a>
          </Button>
        )}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {certificate.title}
      </h3>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Building2 className="h-4 w-4" />
        <span>{certificate.issuer}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Calendar className="h-4 w-4" />
        <span>{certificate.date}</span>
      </div>

      {certificate.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {certificate.description}
        </p>
      )}

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {certificate.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {certificate.credentialId && (
        <p className="text-xs text-muted-foreground mt-4 font-mono">
          ID: {certificate.credentialId}
        </p>
      )}
    </div>
  )
}

export function Certificates() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
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
    <section id="certificates" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm">
            Achievements
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Certificates & Credentials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A collection of certifications I&apos;ve earned throughout my learning journey.
            These represent my commitment to continuous learning and skill development.
          </p>
        </div>

        {/* Stats */}
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-200",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-3xl font-bold text-primary">{certificates.length}</p>
            <p className="text-sm text-muted-foreground">Total Certificates</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-3xl font-bold text-primary">
              {new Set(certificates.flatMap((c) => c.skills)).size}
            </p>
            <p className="text-sm text-muted-foreground">Skills Covered</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-3xl font-bold text-primary">
              {new Set(certificates.map((c) => c.issuer)).size}
            </p>
            <p className="text-sm text-muted-foreground">Issuers</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-3xl font-bold text-primary">2024</p>
            <p className="text-sm text-muted-foreground">Latest Year</p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.title}
              certificate={certificate}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
