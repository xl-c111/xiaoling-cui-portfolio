import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Github, Code2, Layers, Star, Box } from "lucide-react";
import Image from "next/image";
import { getImagePath } from "@/lib/utils-image";
import { projects, projectsBySlug } from "@/lib/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsBySlug[slug];

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
