"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Briefcase } from "lucide-react";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/animations";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Business Analyst",
    company: "Taiyuan Heavy Machinery Group Co., Ltd.",
    location: "Taiyuan, China",
    period: "August 2016 – December 2018",
    duration: "2.5 years",
    skills: ["SQL", "Excel", "Tableau", "Data Analysis", "BI Solutions", "Data Visualization"],
    categories: ["Data Analysis", "Business Intelligence", "Training"],
    highlights: [
      "Collaborated with cross-functional teams and international clients to develop BI solutions",
      "Extracted and analyzed large-scale datasets to uncover actionable insights",
      "Conducted customer survey analyses to inform operational improvements",
      "Led development of automated reporting tools, enhancing efficiency and accuracy",
      "Delivered training sessions on data visualization and self-service analytics",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 flex items-center justify-center px-6 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto w-full">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#43766C]">Work Experience</h2>
        </FadeIn>

        <StaggerContainer className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-[29px] top-8 bottom-8 w-0.5 bg-[#43766C] hidden sm:block" />

          {experiences.map((exp, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Card className="gradient-border bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 relative will-change-transform">
                <CardContent className="pt-6 pb-6">
                  <div className="flex gap-6">
                    {/* Timeline dot with icon */}
                    <div className="relative flex-shrink-0">
                      <div className="w-[60px] h-[60px] rounded-full bg-[#43766C] flex items-center justify-center shadow-lg">
                        <Briefcase className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-[#43766C] mb-2">{exp.title}</h3>
                        <p className="text-lg font-semibold text-[#43766C]/80 mb-1">{exp.company}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span>{exp.location}</span>
                          <span>•</span>
                          <span>{exp.period}</span>
                          <span>•</span>
                          <span className="font-medium text-[#B19470]">{exp.duration}</span>
                        </div>
                      </div>

                      {/* Categories */}
                      {exp.categories && exp.categories.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-2">
                            {exp.categories.map((category, cIndex) => (
                              <Badge
                                key={cIndex}
                                className="px-3 py-1 text-xs font-semibold bg-[#43766C] text-white hover:bg-[#386657]"
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills/Technologies */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, sIndex) => (
                              <Badge
                                key={sIndex}
                                variant="outline"
                                className="px-3 py-1 text-xs font-medium border-[#43766C]/30 bg-[#43766C]/5 hover:bg-[#43766C]/10 transition-colors duration-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlights */}
                      <ul className="space-y-4">
                        {exp.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="h-6 w-6 text-[#43766C] mt-1 shrink-0" />
                            <span className="text-lg text-foreground leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
