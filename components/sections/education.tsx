"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, GraduationCap, Globe, Award } from "lucide-react";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/animations";
import { motion } from "framer-motion";

const education = [
  {
    title: "Software Engineering",
    institution: "Holberton School Australia",
    location: "Melbourne, Australia",
    period: "February 2025 – November 2025",
    duration: "9 months",
    type: "certification",
    icon: GraduationCap,
    skills: ["Python", "C", "JavaScript", "SQL", "React", "Flask", "Git", "Docker", "CI/CD", "TDD"],
    highlights: [
      "Completed intensive, full-time program emphasizing collaborative, hands-on learning",
      "Developed real-world applications strengthening full-stack development skills",
      "Applied software engineering principles and Test-Driven Development (TDD)",
      "Gained proficiency in CI/CD workflows and Git-based version control",
      "Studied data structures and algorithms with focus on performance optimization",
    ],
  },
  {
    title: "Exchange Student - German",
    institution: "TU Bergakademie Freiberg",
    location: "Freiberg, Germany",
    period: "September 2014 – September 2015",
    duration: "1 year",
    type: "exchange",
    icon: Globe,
    skills: ["German", "Cross-cultural Communication", "Adaptability"],
    highlights: ["Developed strong adaptability and intercultural communication skills"],
  },
  {
    title: "Bachelor of Arts - German",
    institution: "Northwestern Polytechnical University",
    location: "Xi'an, China",
    period: "September 2011 – July 2016",
    duration: "4 years",
    type: "degree",
    icon: Award,
    skills: ["German", "Computer Engineering", "Visual Basic"],
    achievements: ["University Scholarship for Academic Excellence (2012, 2013)"],
    highlights: [
      "Completed foundational coursework in computer science",
      "Studied Computer Engineering and Visual Basic Programming",
    ],
  },
];

export function Education() {
  return (
    <section id="education" className="scroll-mt-16 flex items-center justify-center px-6 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto w-full">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#43766C]">Education</h2>
        </FadeIn>

        <StaggerContainer className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-[29px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#43766C] via-[#B19470] to-[#43766C] hidden sm:block" />

          {education.map((edu, index) => {
            const Icon = edu.icon;
            const isFirst = index === 0;

            return (
              <motion.div key={index} variants={staggerItem}>
                <Card className="gradient-border bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 relative will-change-transform">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex gap-6">
                      {/* Timeline dot with icon */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-[60px] h-[60px] rounded-full flex items-center justify-center ${
                            isFirst ? "bg-[#43766C]" : "bg-[#B19470]"
                          } shadow-lg`}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-[#43766C] mb-2">{edu.title}</h3>
                          <p className="text-lg font-semibold text-[#43766C]/80 mb-1">{edu.institution}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span>{edu.location}</span>
                            <span>•</span>
                            <span>{edu.period}</span>
                            <span>•</span>
                            <span className="font-medium text-[#B19470]">{edu.duration}</span>
                          </div>
                        </div>

                        {/* Skills/Technologies */}
                        {edu.skills && edu.skills.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {edu.skills.map((skill, sIndex) => (
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

                        {/* Achievements */}
                        {edu.achievements && edu.achievements.length > 0 && (
                          <div className="mb-4 p-3 rounded-lg bg-[#B19470]/10 border border-[#B19470]/20">
                            <p className="text-sm font-semibold text-[#B19470] flex items-center gap-2">
                              <Award className="h-4 w-4" />
                              {edu.achievements[0]}
                            </p>
                          </div>
                        )}

                        {/* Highlights */}
                        <ul className="space-y-4">
                          {edu.highlights.map((highlight, hIndex) => (
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
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
