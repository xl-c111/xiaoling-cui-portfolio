import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Github, Code2, Layers, Star, Box } from "lucide-react";
import Image from "next/image";
import { getImagePath } from "@/lib/utils-image";

// Project data with detailed information
const projects = {
  "been-there": {
    title: "been there - Peer Support Platform",
    description:
      "Peer support platform connecting people to authentic recovery stories through AI-powered semantic matching, combating online radicalization and toxic echo chambers.",
    longDescription:
      "A production-ready peer support platform designed to combat online radicalization by connecting people to authentic mentor stories from those who have overcome similar challenges. Built with Next.js 16, React 19, and TypeScript, featuring AI semantic matching via sentence-transformers, conversational AI through OpenRouter (Gemini 2.0 Flash), and hybrid serverless architecture. Real human experiences, not AI therapy. Delivered in 48-hour eSafety Hackathon 'Needle in the Hashtag' sprint.",
    image: "/beenthere.webp",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "OpenRouter API",
      "Gemini 2.0 Flash",
      "sentence-transformers",
      "Tailwind CSS v4",
      "shadcn/ui",
    ],
    github: "https://github.com/xl-c111/NeedleInTheHashtag_Hackathon",
    demo: "https://needleinthehashtaghackathon.vercel.app",
    features: [
      "🎯 Social Impact - Combat online radicalization and toxic echo chambers by providing diverse, compassionate peer perspectives and authentic recovery stories",
      "🤖 AI Semantic Matching - sentence-transformers with cosine similarity to connect users to relevant mentor stories based on their experiences",
      "💬 Compassionate AI Chat - OpenRouter API (Gemini 2.0 Flash) helps users articulate feelings in a stigma-free, anonymous environment",
      "🔐 Anonymous & Secure - Supabase Auth supporting email/password and anonymous sign-in with Row-Level Security policies for privacy",
      "⚡ Hybrid Architecture - Vercel (frontend + API routes) + Hugging Face Space (FastAPI semantic matching) + Supabase (database + auth)",
      "📝 Private Journaling - Personal reflection space with theme-based story filtering, dark mode, and fully responsive design",
      "🚀 Rapid Development - Production-ready application delivered in 48-hour eSafety Hackathon sprint (Nov 2025)",
    ],
    stats: {
      technologies: 11,
      features: 7,
    },
  },
  flora: {
    title: "Flora",
    description:
      "Full-stack flower marketplace with React/TypeScript frontend, Express backend, and complete e-commerce functionality.",
    longDescription:
      "A production-ready, cloud-deployed flower marketplace built with React, TypeScript, and Express. Includes secure Stripe checkout with webhook handling, Auth0-based authentication, AI-powered gift message generation via Gemini, automated transactional emails, Dockerized services, CI/CD pipelines with GitHub Actions, and a scalable AWS architecture leveraging EC2, S3 + CloudFront, and managed RDS.",
    image: "/flora.webp",
    technologies: [
      "React",
      "TypeScript",
      "Express",
      "Prisma ORM",
      "PostgreSQL",
      "Stripe",
      "Auth0",
      "Nodemailer",
      "Gemini AI",
      "Docker",
      "GitHub Actions",
      "AWS",
    ],
    github: "https://github.com/xl-c111/Flora",
    demo: "https://dzmu16crq41il.cloudfront.net/",
    features: [
      "🌸 Full-stack Marketplace - Browse flowers, manage checkout, and handle subscriptions",
      "🔐 Auth0 Authentication - Secure user authentication and authorization",
      "💳 Stripe Integration - Secure checkout with Stripe API (test mode) and webhook handling",
      "📧 Automated Emails - Confirmation emails via Nodemailer for order updates",
      "🤖 AI Gift Messages - Gemini AI integration for personalized gift message generation",
      "🐳 Docker Containerization - Containerized frontend, backend, database, and Stripe-CLI services",
      "☁️ AWS Deployment - Production deployment using EC2, S3, CloudFront, and RDS",
      "🚀 CI/CD Pipeline - GitHub Actions for automated testing and seamless deployment",
    ],
    stats: {
      technologies: 11,
      features: 7,
    },
  },
  "hbnb-luxe-airbnb-clone": {
    title: "HBnB - Luxe Airbnb Clone",
    description:
      "Portfolio-grade, full-stack Airbnb-style marketplace built with React and Flask, featuring Stripe payments, JWT auth, and host/guest flows.",
    longDescription:
      "A portfolio-grade, full-stack Airbnb-style marketplace built with React 19 and Flask. It includes Stripe Payment Intents, JWT authentication, role-based host/guest flows, and a MySQL-compatible TiDB Serverless database. Deployed end-to-end with Vercel (frontend) and Fly.io (backend), with a public health endpoint at https://hbnb-backend.fly.dev/health.",
    image: "/hbnb.webp",
    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Flask",
      "SQLAlchemy",
      "Gunicorn",
      "TiDB Serverless (MySQL-compatible)",
      "Stripe Payment Intents",
      "JWT Auth",
      "Fly.io",
      "Vercel",
    ],
    github: "https://github.com/xl-c111/holbertonschool-hbnb",
    demo: "https://hbnb-luxeairbnbclone.vercel.app/",
    features: [
      "🏠 Host and guest workflows with role-based access control and stateful booking management",
      "📅 Transaction-safe booking flow with backend availability validation and Stripe webhook verification",
      "⭐ Review system enforcing business rules to prevent duplicate or invalid submissions",
      "🔐 JWT authentication with secure token validation and authorization middleware",
      "🩺 /health endpoint for uptime monitoring and deployment readiness checks",
      "☁️ Cloud deployment across TiDB Serverless (distributed SQL), Fly.io (containerized backend), and Vercel (edge-hosted frontend)",
    ],
    stats: {
      technologies: 11,
      features: 6,
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug: slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen pt-6 sm:pt-8 pb-12 sm:pb-16 bg-gradient-to-b from-background via-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-12 text-base sm:text-lg text-muted-foreground">
            <Link
              href="/portfolio"
              className="flex items-center gap-2 hover:text-[#43766C] transition-all hover:gap-3 group"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-pulse" />
              <span className="font-medium">Back to Projects</span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#43766C] via-[#5a8a7a] to-[#43766C] bg-clip-text text-transparent animate-gradient mb-6 sm:mb-8">
            {project.title}
          </h1>

          {/* Mobile Image - Only visible on mobile */}
          <div className="lg:hidden mb-6 sm:mb-8">
            <div className="rounded-xl overflow-hidden border border-[#43766C]/30">
              <Image
                src={getImagePath(project.image)}
                alt={project.title}
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 600px, 100vw"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
            {/* Left Column - All Content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="gradient-border bg-card/80 backdrop-blur-sm hover:glow-sage transition-all group">
                  <CardContent className="py-0 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#43766C]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Code2 className="h-5 w-5 text-[#43766C]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground leading-none">
                        {project.stats.technologies}
                      </div>
                      <div className="text-m text-muted-foreground font-medium mt-1">Total Technology</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-border bg-card/80 backdrop-blur-sm hover:glow-sage transition-all group">
                  <CardContent className="py-1.5 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#43766C]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Layers className="h-5 w-5 text-[#43766C]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground leading-none">{project.stats.features}</div>
                      <div className="text-m text-muted-foreground font-medium mt-1">Key Features</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#43766C] hover:bg-[#386657] text-white text-base px-6 py-5 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  asChild
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="bg-[#43766C] hover:bg-[#386657] text-white text-base px-6 py-5 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </a>
                </Button>
              </div>

              {/* Technologies Used */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-[#43766C]" />
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Technologies Used</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="px-3 py-2 text-sm font-medium border-[#43766C]/40 bg-[#43766C]/10 hover:bg-[#43766C]/20 hover:scale-105 transition-all cursor-default flex items-center gap-2"
                    >
                      <Box className="h-4 w-4 text-[#43766C]" />
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Project Image and Key Features */}
            <div className="space-y-6 sm:space-y-8">
              {/* Project Image - Only visible on desktop */}
              <div className="hidden lg:block relative group">
                <div className="rounded-xl overflow-hidden border border-[#43766C]/30">
                  <Image
                    src={getImagePath(project.image)}
                    alt={project.title}
                    width={1400}
                    height={900}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Key Features */}
              <Card className="bg-[#43766C] border border-[#F8FAE5]/20 shadow-xl">
                <CardContent className="pt-8 pb-8 px-6 sm:px-8">
                  {/* Header */}
                  <div className="mb-6 pb-4 border-b border-[#F8FAE5]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F8FAE5]/10 flex items-center justify-center">
                        <Star className="h-5 w-5 text-[#F8FAE5]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#F8FAE5]">Key Features</h2>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3">
                    {project.features.map((feature, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 rounded-lg bg-[#F8FAE5]/10 border border-[#F8FAE5]/20 hover:bg-[#F8FAE5]/15 transition-all"
                        >
                          {/* Simple bullet point */}
                          <div className="mt-1.5 shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#B19470]" />
                          </div>

                          {/* Feature text */}
                          <p className="text-sm leading-relaxed text-[#F8FAE5] font-medium">{feature}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
