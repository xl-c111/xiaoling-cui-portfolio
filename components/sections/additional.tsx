"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages, MapPin, FileText, Users } from "lucide-react";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/animations";
import { motion } from "framer-motion";

const additionalInfo = [
  {
    icon: Languages,
    title: "Languages",
    content: "English, Mandarin, German",
  },
  {
    icon: FileText,
    title: "Visa",
    content: "Australian Permanent Resident",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Based in Melbourne and open to hybrid roles",
  },
  {
    icon: Users,
    title: "Collaboration",
    content: "Agile sprints, pair programming, code reviews",
  },
];

export function Additional() {
  return (
    <section id="additional" className="scroll-mt-16 flex items-center justify-center px-6 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto w-full">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">
            <span className="text-[#43766C]">Additional Information</span>
          </h2>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {additionalInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div key={index} variants={staggerItem}>
                <Card className="gradient-border bg-card/50 backdrop-blur-sm hover:glow-sage hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="pt-2 pb-2 sm:pt-3 sm:pb-3">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#43766C]/20 flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6 text-[#43766C]" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#43766C] mb-2">{info.title}</h3>
                        <p className="text-base sm:text-lg text-foreground leading-relaxed">{info.content}</p>
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
