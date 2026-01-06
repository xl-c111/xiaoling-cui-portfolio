"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Award, Boxes, ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/animations";
import { TiltCard } from "@/components/tilt-card";
import { motion } from "framer-motion";
import Image from "next/image";
import { getImagePath } from "@/lib/utils-image";

type Tab = "projects" | "techstack" | "certificates";

const projects = [
  {
    slug: "hbnb-luxe-airbnb-clone",
    title: "HBnB - Luxe Airbnb Clone",
    description:
      "Portfolio-grade, full-stack Airbnb-style marketplace with Stripe payments, JWT auth, and host/guest flows.",
    image: "/hbnb.webp",
    tags: ["React 19", "Flask", "Tailwind CSS", "TiDB", "Stripe", "JWT"],
    liveDemo: "https://hbnb-luxeairbnbclone.vercel.app/",
    github: "https://github.com/xl-c111/holbertonschool-hbnb",
  },
  {
    slug: "flora",
    title: "Flora - Ecommerce Flower Marketplace",
    description:
      "Full-stack app with Auth0, Stripe checkout, AI gift messages, subscriptions, and email notifications.",
    image: "/flora.webp",
    tags: ["React", "TypeScript", "Express", "Auth0", "Prisma", "Gemini AI"],
    liveDemo: "https://dzmu16crq41il.cloudfront.net/",
    github: "https://github.com/xl-c111/Flora",
  },
  {
    slug: "been-there",
    title: "Been There - AI-Powered Peer Support Platform",
    description:
      "An AI platform using semantic matching to counter online radicalization through authentic recovery stories.",
    image: "/beenthere.webp",
    tags: ["Next.js 16", "Vercel", "HF Space", "Supabase", "Gemini 2.0"],
    liveDemo: "https://needleinthehashtaghackathon.vercel.app",
    github: "https://github.com/xl-c111/NeedleInTheHashtag_Hackathon",
  },
];

const certificates = [
  {
    title: "Foundations of Software Engineering",
    issuer: "Holberton School Australia",
    date: "November 2025",
    image: "/certificate.webp",
    description: "Intensive training in programming, algorithms, and real-world project development.",
  },
  {
    title: "AI Engineer For Developers Associate",
    issuer: "DataCamp",
    date: "December 2025",
    image: "/ai-engineer-certificate.webp",
    description:
      "Foundational certification covering AI theory, LLM concepts, prompt engineering, AI governance, and building complex AI systems with Python.",
  },
  {
    title: "Understanding Cloud Computing",
    issuer: "DataCamp",
    date: "December 2025",
    image: "/understanding_cloud_computing.webp",
    description:
      "Learned core cloud concepts, service and deployment models, and how AWS, Azure, and Google Cloud enable scalable, reliable, and cost-effective systems.",
  },
  {
    title: "Working with the OpenAI API",
    issuer: "DataCamp",
    date: "December 2025",
    image: "/working_with_the_openai_api.webp",
    description:
      "learned to use Python to access OpenAI models for text generation, sentiment analysis, classification, and building conversational AI applications.",
  },
];

const techStack = [
  {
    name: "Python",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C9.79 2 8 3.34 8 5v5h4v1H6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2v-3c0-1.1.9-2 2-2h6c1.1 0 2-.9 2-2V5c0-1.66-1.79-3-4-3h-2z" fill="#B19470" opacity="0.5"/><path d="M12 22c2.21 0 4-1.34 4-3v-5h-6v-1h6c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-2z" fill="#43766C"/><circle cx="10" cy="6" r="1" fill="#43766C"/><circle cx="14" cy="18" r="1" fill="#B19470"/></svg>',
  },
  {
    name: "C",
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#B19470" opacity="0.2"/><path d="M15 8c-1.5-1-3-1-4.5 0-1.5 1-1.5 3-1.5 4s0 3 1.5 4c1.5 1 3 1 4.5 0" stroke="#43766C" strokeWidth="2.5" strokeLinecap="round"/></svg>',
  },
  {
    name: "JavaScript",
    svg: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#B19470" opacity="0.3"/><path d="M10 16v-4M14 16v-6" stroke="#43766C" strokeWidth="2" strokeLinecap="round"/></svg>',
  },
  {
    name: "TypeScript",
    svg: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#B19470" opacity="0.3"/><path d="M12 8v8M8 12h8" stroke="#43766C" strokeWidth="2" strokeLinecap="round"/></svg>',
  },
  {
    name: "React",
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2" fill="#43766C"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#B19470" strokeWidth="2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#43766C" strokeWidth="2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" stroke="#B19470" strokeWidth="2" fill="none"/></svg>',
  },
  {
    name: "Next.js",
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#43766C" strokeWidth="2" fill="none"/><path d="M16 8l-8 12M9 8h7M14 16h-7" stroke="#B19470" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 10v8" stroke="#43766C" strokeWidth="2" strokeLinecap="round"/></svg>',
  },
  {
    name: "Tailwind CSS",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.5 6 12 6z" fill="#B19470"/><path d="M7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.41 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z" fill="#43766C"/></svg>',
  },
  {
    name: "Node.js",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="#43766C" strokeWidth="2" fill="none" strokeLinejoin="round"/><path d="M12 3v18M4 7.5l8 4.5M20 7.5l-8 4.5" stroke="#B19470" strokeWidth="1.5" strokeLinecap="round"/></svg>',
  },
  {
    name: "Flask",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 3h6v6l3 6v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4l3-6V3z" fill="#B19470" opacity="0.3"/><path d="M9 3h6M9 9l3 6M15 9l-3 6M7 15v4a2 2 0 002 2h6a2 2 0 002-2v-4" stroke="#43766C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  },
  {
    name: "Express JS",
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2" fill="#43766C"/><path d="M3 12h18M3 6h18M3 18h18" stroke="#B19470" strokeWidth="2" strokeLinecap="round"/></svg>',
  },
  {
    name: "PostgreSQL",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="#B19470" strokeWidth="2" strokeLinecap="round"/><circle cx="8" cy="12" r="2" fill="#43766C"/></svg>',
  },
  {
    name: "MySQL",
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#B19470" opacity="0.2"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#43766C" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="2" fill="#43766C"/></svg>',
  },
  {
    name: "Docker",
    svg: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="13" width="4" height="4" fill="#43766C"/><rect x="9" y="13" width="4" height="4" fill="#B19470"/><rect x="14" y="13" width="4" height="4" fill="#43766C"/><rect x="9" y="8" width="4" height="4" fill="#B19470"/><path d="M2 13h20v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" stroke="#43766C" strokeWidth="2" fill="none"/></svg>',
  },
  {
    name: "AWS",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 15l6-3 6 3v5l-6 3-6-3v-5z" fill="#B19470" opacity="0.4"/><path d="M12 6l6 3-6 3-6-3 6-3z" fill="#43766C"/><path d="M3 7.5l6 3.5v7l-6-3.5v-7z" fill="#43766C"/><path d="M15 7.5l6 3.5v7l-6-3.5v-7z" fill="#43766C" opacity="0.7"/></svg>',
  },
  {
    name: "Terraform",
    svg: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 4l6 3.5v7L9 18V4z" fill="#B19470" opacity="0.4"/><path d="M3 7.5l6 3.5v7l-6-3.5v-7z" fill="#43766C"/><path d="M15 7.5l6 3.5v7l-6-3.5v-7z" fill="#43766C" opacity="0.7"/></svg>',
  },
  {
    name: "GitHub Actions",
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#B19470" opacity="0.3"/><path d="M12 3v4m0 10v4M3 12h4m10 0h4" stroke="#43766C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  },
  {
    name: "AI Integration",
    svg: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="#43766C"/><circle cx="6" cy="6" r="2" fill="#B19470" opacity="0.6"/><circle cx="18" cy="6" r="2" fill="#B19470" opacity="0.6"/><circle cx="6" cy="18" r="2" fill="#B19470" opacity="0.6"/><circle cx="18" cy="18" r="2" fill="#B19470" opacity="0.6"/><path d="M12 9L8 7M12 9l4-2M12 15l-4 2M12 15l4 2" stroke="#43766C" strokeWidth="1.5"/></svg>',
  },
];

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "projects" || tab === "techstack" || tab === "certificates") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <section id="portfolio" className="px-6 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
            <span className="text-[#43766C]">Portfolio Showcase</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base sm:text-lg text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
            Building robust, scalable systems with modern frameworks and clean, maintainable code.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-4xl rounded-2xl p-2 bg-card/40 backdrop-blur-sm border border-border/70">
              <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveTab("projects")}
                className={`relative flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 rounded-2xl border transition-all duration-200 ${
                  activeTab === "projects"
                    ? "bg-[#43766C]/30 text-[#2C5A52] border-[#43766C]/70 shadow-lg shadow-[#43766C]/25"
                    : "bg-card/60 text-foreground/70 border-border/60 hover:bg-card/80 hover:text-foreground hover:border-[#43766C]/40"
                }`}
              >
                <Code className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">Projects</span>
              </button>
              <button
                onClick={() => setActiveTab("techstack")}
                className={`relative flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 rounded-2xl border transition-all duration-200 ${
                  activeTab === "techstack"
                    ? "bg-[#B19470]/35 text-[#7A5B36] border-[#B19470]/70 shadow-lg shadow-[#B19470]/25"
                    : "bg-card/60 text-foreground/70 border-border/60 hover:bg-card/80 hover:text-foreground hover:border-[#B19470]/40"
                }`}
              >
                <Boxes className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">Tech Stack</span>
              </button>
              <button
                onClick={() => setActiveTab("certificates")}
                className={`relative flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 rounded-2xl border transition-all duration-200 ${
                  activeTab === "certificates"
                    ? "bg-[#43766C]/30 text-[#2C5A52] border-[#43766C]/70 shadow-lg shadow-[#43766C]/25"
                    : "bg-card/60 text-foreground/70 border-border/60 hover:bg-card/80 hover:text-foreground hover:border-[#43766C]/40"
                }`}
              >
                <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">Certificates</span>
              </button>
            </div>
            </div>
          </div>
        </FadeIn>

        {activeTab === "projects" && (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div key={index} variants={staggerItem}>
                <TiltCard className="h-full">
                  <Card className="gradient-border bg-card/50 backdrop-blur-sm overflow-hidden group hover:glow-sage transition-all duration-300 flex flex-col h-[680px]">
                    <Link
                      href={`/project/${project.slug}`}
                      prefetch={false}
                      className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#43766C]/20 to-[#B19470]/20 block"
                    >
                      {/* Gradient overlay for better text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

                      {/* Image */}
                      <Image
                        src={getImagePath(project.image || "/placeholder.svg")}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
                      />

                      {/* Colored accent bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#43766C] via-[#B19470] to-[#43766C] z-20" />
                    </Link>
                    <CardContent className="pt-6 px-4 sm:px-6">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">{project.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs sm:text-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:flex-1 border-[#43766C]/40 text-[#43766C] hover:bg-[#43766C]/10 hover:text-[#43766C]"
                          asChild
                        >
                          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            <span className="text-xs sm:text-sm">Live Demo</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:flex-1 border-[#43766C]/40 text-[#43766C] hover:bg-[#43766C]/10 hover:text-[#43766C]"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-3 w-3" />
                            <span className="text-xs sm:text-sm">GitHub</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:flex-1 border-[#43766C]/40 text-[#43766C] hover:bg-[#43766C]/10 hover:text-[#43766C]"
                          asChild
                        >
                          <Link href={`/project/${project.slug}`} prefetch={false}>
                            <ArrowRight className="mr-2 h-3 w-3" />
                            <span className="text-xs sm:text-sm">Details</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </StaggerContainer>
        )}
        {activeTab === "techstack" && (
          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            staggerDelay={0.05}
          >
            {techStack.map((tech, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="gradient-border bg-card/50 backdrop-blur-sm hover:glow-sage hover:scale-105 transition-all duration-200 group will-change-transform">
                  <CardContent className="pt-5 pb-5 flex flex-col items-center justify-center gap-3">
                    <div
                      className="w-24 h-24 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: tech.svg }}
                    />
                    <span className="text-sm font-semibold text-center text-foreground">{tech.name}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        )}
        {activeTab === "certificates" && (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div key={index} variants={staggerItem}>
                <TiltCard className="h-full">
                  <Card className="gradient-border bg-card/50 backdrop-blur-sm overflow-hidden group hover:glow-sage transition-all duration-300 flex flex-col h-[620px]">
                    {/* Fixed height for all certificates */}
                    <div className="relative w-full h-[280px] overflow-hidden bg-white shrink-0">
                      <Image
                        src={getImagePath(cert.image || "/placeholder.svg")}
                        alt={`${cert.title} Certificate`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-contain object-center p-2 group-hover:scale-105 transition-transform duration-300 will-change-transform"
                      />
                      {/* Colored accent bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#43766C] via-[#B19470] to-[#43766C] z-20" />
                    </div>
                    <CardContent className="pt-6 px-4 sm:px-6 flex-1 flex flex-col">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">{cert.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-4 w-4 text-[#43766C]" />
                        <p className="text-sm sm:text-base font-semibold text-[#43766C]">{cert.issuer}</p>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4">{cert.date}</p>
                      <p className="text-sm sm:text-base text-muted-foreground flex-1">{cert.description}</p>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
