"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, ExternalLink, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations";
import { GradientText } from "@/components/gradient-text";
import { motion } from "framer-motion";
import Image from "next/image";
import { getImagePath } from "@/lib/utils-image";
import { toast } from "sonner";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 sm:px-6 lg:px-8 pt-10 pb-12 bg-[#43766C]"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <FadeIn delay={0.1} duration={0.2} direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F8FAE5]/30 bg-[#F8FAE5]/10 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#F8FAE5] animate-pulse" />
              <span className="text-base text-[#F8FAE5]">Ready to Innovate</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} duration={0.25}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="text-[#F8FAE5]">Full Stack</span>
              <br />
              <GradientText>Developer</GradientText>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2} duration={0.25}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#F8FAE5]/80 mb-4 font-mono">
              Software Engineering<span className="text-[#B19470]"></span>
            </p>
          </FadeIn>

          <FadeIn delay={0.25} duration={0.25}>
            <p className="text-base sm:text-lg md:text-xl text-[#F8FAE5]/90 mb-8 leading-relaxed max-w-xl">
              Building innovative solutions that transform complex challenges into elegant, user-focused experiences.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} duration={0.2}>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Python", "JavaScript", "React", "SQL", "AWS", "CI/CD"].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + index * 0.02, duration: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <Badge
                    variant="outline"
                    className="px-4 py-2 text-base border-[#F8FAE5]/30 text-[#F8FAE5] hover:bg-[#F8FAE5]/10 transition-all duration-200 hover:scale-105 will-change-transform"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
            <Button
              size="lg"
              className="bg-[#B19470] hover:bg-[#9A7F5E] text-[#F8FAE5] hover:scale-105 transition-all duration-200 will-change-transform w-full sm:w-auto"
              asChild
            >
              <Link href="/portfolio">
                <ExternalLink className="mr-2 h-4 w-4" />
                Projects
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-[#B19470] hover:bg-[#9A7F5E] text-[#F8FAE5] hover:scale-105 transition-all duration-200 will-change-transform w-full sm:w-auto"
              asChild
            >
              <button
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    const offset = 64;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </button>
            </Button>
          </div>

          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com/xl-c111" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/xiaolingcui/" },
              { icon: Mail, href: "mailto:xiaolingcui0111@gmail.com" },
            ].map((social, index) => {
              const Icon = social.icon;
              const isEmail = Icon === Mail;

              if (isEmail) {
                return (
                  <motion.button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      const emailAddress = "xiaolingcui0111@gmail.com";

                      // Dismiss any existing toasts before showing new one
                      toast.dismiss();

                      toast.custom(
                        () => (
                          <div className="flex items-center gap-4 bg-[#F8FAE5] border-2 border-[#43766C] rounded-3xl p-4 shadow-lg min-w-[320px]">
                            <div className="text-4xl">📧</div>
                            <div className="flex-1">
                              <div className="text-[#76453B] font-bold text-lg mb-1">Contact Me</div>
                              <div className="text-[#43766C] font-semibold text-base mb-2">{emailAddress}</div>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(emailAddress);
                                  toast.dismiss();
                                  toast("✓ Email copied to clipboard!", {
                                    duration: 2000,
                                    style: {
                                      background: "#F8FAE5",
                                      color: "#43766C",
                                      border: "2px solid #43766C",
                                      borderRadius: "1.5rem",
                                      padding: "16px",
                                      fontSize: "16px",
                                      fontWeight: "600",
                                    },
                                  });
                                }}
                                className="bg-[#43766C] hover:bg-[#386657] text-[#F8FAE5] px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                              >
                                Copy Email
                              </button>
                            </div>
                          </div>
                        ),
                        {
                          duration: 5000,
                        }
                      );
                    }}
                    className="w-12 h-12 rounded-lg bg-[#F8FAE5]/10 border border-[#F8FAE5]/30 flex items-center justify-center text-[#F8FAE5] will-change-transform cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{
                      transition: "background-color 0.15s ease, border-color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(248, 250, 229, 0.5)";
                      e.currentTarget.style.backgroundColor = "rgba(248, 250, 229, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.backgroundColor = "";
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.button>
                );
              }

              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-[#F8FAE5]/10 border border-[#F8FAE5]/30 flex items-center justify-center text-[#F8FAE5] will-change-transform"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                  style={{
                    transition: "background-color 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(248, 250, 229, 0.5)";
                    e.currentTarget.style.backgroundColor = "rgba(248, 250, 229, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </div>

        <FadeIn delay={0.2} duration={0.25} direction="right" className="hidden md:flex items-center justify-center">
          <motion.div
            className="relative w-full max-w-lg group will-change-transform"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Decorative gradient background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B19470] via-[#F8FAE5] to-[#B19470] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />

            {/* Image container with overlay */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#43766C]/10 via-transparent to-[#B19470]/10 z-10" />

              <Image
                src={getImagePath("/hero.webp")}
                alt="Xiaoling Cui - Full Stack Developer"
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 60vw, 100vw"
                className="relative w-full h-auto object-cover"
              />

              {/* Border accent */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-[#F8FAE5]/20 z-20" />
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
