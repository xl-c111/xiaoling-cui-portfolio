"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { toast } from "sonner";

export const Navigation = memo(function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const router = useRouter();
  const pathname = usePathname();
  const ticking = useRef(false);
  const sectionPositionsRef = useRef<Map<string, { top: number; bottom: number }>>(new Map());

  const getNavHeight = useCallback(() => {
    if (typeof window === "undefined") return 64;
    const nav = document.querySelector<HTMLElement>("[data-site-nav]");
    const height = nav?.getBoundingClientRect().height;
    return Math.floor(height ?? 64);
  }, []);

  // Cache section positions to avoid repeated DOM queries
  const cacheSectionPositions = useCallback(() => {
    const sections = ["hero", "about", "portfolio", "experience", "education", "additional", "contact"];
    const positions = new Map<string, { top: number; bottom: number }>();

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        positions.set(sectionId, { top: offsetTop, bottom: offsetTop + offsetHeight });
      }
    });

    sectionPositionsRef.current = positions;
  }, []);

  const scrollWithinPage = useCallback((sectionId: string) => {
    if (typeof window === "undefined") return false;

    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      return true;
    }

    const element = document.getElementById(sectionId);
    if (!element) return false;

    // `scroll-mt-*` on sections handles the fixed navbar offset.
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${sectionId}`);
    return true;
  }, []);

  // Track active section based on scroll position or pathname
  useEffect(() => {
    // Map pathname to section ID
    const pathToSection: { [key: string]: string } = {
      "/": "hero",
      "/about": "about",
      "/portfolio": "portfolio",
      "/experience": "experience",
      "/education": "education",
      "/additional": "additional",
      "/contact": "contact",
    };

    // If not on home page, set active section based on pathname
    if (pathname !== "/") {
      const section = pathToSection[pathname] || "hero";
      setActiveSection(section);
      return;
    }

    // Cache positions initially and on resize
    cacheSectionPositions();

    // Recache positions when window resizes (throttled)
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(cacheSectionPositions, 150);
    };
    window.addEventListener("resize", handleResize);

    // Throttled scroll handler using requestAnimationFrame
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;
      const positions = sectionPositionsRef.current;

      for (const [sectionId, { top, bottom }] of positions) {
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(sectionId);
          break;
        }
      }

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateActiveSection);
        ticking.current = true;
      }
    };

    updateActiveSection(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [pathname, cacheSectionPositions]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const routeMap: { [key: string]: string } = {
        hero: "/",
        about: "/about",
        portfolio: "/portfolio",
        experience: "/experience",
        education: "/education",
        additional: "/additional",
        contact: "/contact",
      };

      const onHomePage = pathname === "/";

      if (onHomePage) {
        const handled = scrollWithinPage(sectionId);
        if (handled) {
          setIsMobileMenuOpen(false);
          return;
        }
      }

      const route = routeMap[sectionId] || "/";
      router.push(route);
      setIsMobileMenuOpen(false);
    },
    [pathname, router, scrollWithinPage]
  );

  const navigateToPortfolioTab = useCallback(
    (tab: "projects" | "techstack" | "certificates") => {
      router.push(`/portfolio?tab=${tab}`);
      setIsMobileMenuOpen(false);
    },
    [router]
  );

  // Handle hash navigation when landing on page with hash
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      let isCancelled = false;
      let attempts = 0;
      const maxAttempts = 12;

      const tryAlign = () => {
        if (isCancelled) return;

        const element = document.getElementById(sectionId);
        if (!element) {
          attempts += 1;
          if (attempts < maxAttempts) {
            window.setTimeout(tryAlign, 80);
          }
          return;
        }

        const navHeight = getNavHeight();
        const delta = element.getBoundingClientRect().top - navHeight;
        if (Math.abs(delta) > 2) {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        }
      };

      requestAnimationFrame(tryAlign);

      // Fonts loading can shift layout significantly on first load.
      document.fonts?.ready.then(() => requestAnimationFrame(tryAlign)).catch(() => {});

      return () => {
        isCancelled = true;
      };
    }
  }, [pathname, getNavHeight]);

  const isProjectDetailPage = pathname.startsWith("/project/");

  // Don't render navigation on project detail pages
  if (isProjectDetailPage) {
    return null;
  }

  return (
    <nav
      data-site-nav
      className="fixed top-0 left-0 right-0 w-full z-[100] bg-[#1f3a34]/98 backdrop-blur-md border-b border-[#43766C]/30 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-2xl sm:text-3xl font-black text-[#F8FAE5] cursor-pointer hover:text-[#c5dcd5] transition-colors tracking-tight"
          >
            Xiaoling Cui
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className={`text-base font-semibold transition-all cursor-pointer relative ${
                activeSection === "hero" ? "text-[#c5dcd5] font-semibold" : "text-[#7fa99a] hover:text-[#F8FAE5]"
              }`}
            >
              Home
              {activeSection === "hero" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c5dcd5] rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-base font-semibold transition-all cursor-pointer relative ${
                activeSection === "about" ? "text-[#c5dcd5] font-semibold" : "text-[#7fa99a] hover:text-[#F8FAE5]"
              }`}
            >
              About
              {activeSection === "about" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c5dcd5] rounded-full" />
              )}
            </button>
            <div className="relative group pb-3 -mb-3">
              <button
                onClick={() => scrollToSection("portfolio")}
                className={`text-base font-semibold transition-all cursor-pointer relative ${
                  activeSection === "portfolio"
                    ? "text-[#c5dcd5] font-semibold"
                    : "text-[#7fa99a] hover:text-[#F8FAE5]"
                }`}
              >
                Portfolio
                {activeSection === "portfolio" && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c5dcd5] rounded-full" />
                )}
              </button>
              <span className="absolute left-1/2 top-full h-3 w-[7.5rem] -translate-x-1/2 pointer-events-auto" />
              <div className="absolute left-1/2 top-full z-50 mt-2 w-[7.5rem] -translate-x-1/2 rounded-xl border border-[#43766C]/40 bg-[#203d36] p-2 shadow-lg shadow-black/20 opacity-0 translate-y-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                <button
                  onClick={() => navigateToPortfolioTab("projects")}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#c5dcd5] hover:bg-[#2d4f47]/70 hover:text-[#F8FAE5] transition-colors"
                >
                  Projects
                </button>
                <button
                  onClick={() => navigateToPortfolioTab("techstack")}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#c5dcd5] hover:bg-[#2d4f47]/70 hover:text-[#F8FAE5] transition-colors"
                >
                  Tech Stack
                </button>
                <button
                  onClick={() => navigateToPortfolioTab("certificates")}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#c5dcd5] hover:bg-[#2d4f47]/70 hover:text-[#F8FAE5] transition-colors"
                >
                  Certificates
                </button>
              </div>
            </div>
            <button
              onClick={() => scrollToSection("experience")}
              className={`text-base font-semibold transition-all cursor-pointer relative ${
                activeSection === "experience" ? "text-[#c5dcd5] font-semibold" : "text-[#7fa99a] hover:text-[#F8FAE5]"
              }`}
            >
              Experience
              {activeSection === "experience" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c5dcd5] rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("education")}
              className={`text-base font-semibold transition-all cursor-pointer relative ${
                activeSection === "education" ? "text-[#c5dcd5] font-semibold" : "text-[#7fa99a] hover:text-[#F8FAE5]"
              }`}
            >
              Education
              {activeSection === "education" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c5dcd5] rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("additional")}
              className={`text-base font-semibold transition-all cursor-pointer relative ${
                activeSection === "additional" ? "text-[#c5dcd5] font-semibold" : "text-[#7fa99a] hover:text-[#F8FAE5]"
              }`}
            >
              Additional
              {activeSection === "additional" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c5dcd5] rounded-full" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-base font-semibold transition-all cursor-pointer relative ${
                activeSection === "contact" ? "text-[#c5dcd5] font-semibold" : "text-[#7fa99a] hover:text-[#F8FAE5]"
              }`}
            >
              Contact
              {activeSection === "contact" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c5dcd5] rounded-full" />
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-[#7fa99a] hover:text-[#F8FAE5] hover:bg-[#2d4f47]/50" asChild>
              <a href="https://github.com/xl-c111" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="text-[#7fa99a] hover:text-[#F8FAE5] hover:bg-[#2d4f47]/50" asChild>
              <a href="https://www.linkedin.com/in/xiaolingcui/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#7fa99a] hover:text-[#F8FAE5] hover:bg-[#2d4f47]/50"
              onClick={(e) => {
                e.preventDefault();

                const emailAddress = 'xiaolingcui0111@gmail.com';

                // Dismiss any existing toasts before showing new one
                toast.dismiss();

                toast.custom(() => (
                  <div className="flex items-center gap-4 bg-[#F8FAE5] border-2 border-[#43766C] rounded-3xl p-4 shadow-lg min-w-[320px]">
                    <div className="text-4xl">📧</div>
                    <div className="flex-1">
                      <div className="text-[#76453B] font-bold text-lg mb-1">Contact Me</div>
                      <div className="text-[#43766C] font-semibold text-base mb-2">{emailAddress}</div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(emailAddress);
                          toast.dismiss();
                          toast('✓ Email copied to clipboard!', {
                            duration: 2000,
                            style: {
                              background: '#F8FAE5',
                              color: '#43766C',
                              border: '2px solid #43766C',
                              borderRadius: '1.5rem',
                              padding: '16px',
                              fontSize: '16px',
                              fontWeight: '600',
                            },
                          });
                        }}
                        className="bg-[#43766C] hover:bg-[#386657] text-[#F8FAE5] px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                      >
                        Copy Email
                      </button>
                    </div>
                  </div>
                ), {
                  duration: 5000,
                });
              }}
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#7fa99a] hover:text-[#F8FAE5] hover:bg-[#2d4f47]/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {[
                { id: "hero", label: "Home" },
                { id: "about", label: "About" },
                { id: "portfolio", label: "Portfolio" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
                { id: "additional", label: "Additional" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-base text-left transition-colors ${
                    activeSection === item.id ? "text-[#c5dcd5] font-semibold" : "text-[#7fa99a]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});
