"use client";

import { Button } from "@/components/ui/button";
import { Code, FileText } from "lucide-react";
import { FadeIn } from "@/components/animations";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 flex items-center justify-center px-6 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto w-full">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="text-[#43766C]">About Me</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            I'm <span className="text-foreground font-semibold">Xiaoling Cui</span>, a full-stack developer with a
            background in data-driven business analytics. I build end-to-end web applications across frontend, backend,
            and databases by creating React UIs, designing RESTful APIs in Python and JavaScript/TypeScript, and working
            with SQL-based data models, with hands-on deployment experience on AWS. I enjoy building scalable,
            maintainable features and collaborating in agile teams to ship reliable, user-focused products.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#43766C] hover:bg-[#386657] text-white hover:scale-105 transition-all duration-200 will-change-transform w-full sm:w-auto"
              asChild
            >
              <a href="/cv.pdf" download>
                <FileText className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-[#43766C] hover:bg-[#386657] text-white hover:scale-105 transition-all duration-200 will-change-transform w-full sm:w-auto"
              asChild
            >
              <button
                onClick={() => {
                  const element = document.getElementById("portfolio");
                  if (element) {
                    const offset = 60;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }}
              >
                <Code className="mr-2 h-4 w-4" />
                View Projects
              </button>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
