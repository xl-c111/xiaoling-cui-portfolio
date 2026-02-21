export type Project = {
  slug: string
  title: string
  cardTitle: string
  cardDescription: string
  cardTags: string[]
  longDescription: string
  image: string
  technologies: string[]
  github: string
  demo: string
  features: string[]
  stats: {
    technologies: number
    features: number
  }
}

export const projects: Project[] = [
  {
    slug: "been-there",
    title: "been there - Peer Support Platform",
    cardTitle: "Been There - AI-Powered Peer Support Platform",
    cardDescription:
      "An AI platform using semantic matching to counter online radicalization through authentic recovery stories.",
    cardTags: ["Next.js 16", "Vercel", "HF Space", "Supabase", "Gemini 2.0"],
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
  {
    slug: "flora",
    title: "Flora",
    cardTitle: "Flora - Ecommerce Flower Marketplace",
    cardDescription:
      "Full-stack app with Auth0, Stripe checkout, AI gift messages, subscriptions, and email notifications.",
    cardTags: ["React", "TypeScript", "Express", "Auth0", "Prisma", "Gemini AI"],
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
      technologies: 12,
      features: 8,
    },
  },
  {
    slug: "hbnb-luxe-airbnb-clone",
    title: "HBnB - Luxe Airbnb Clone",
    cardTitle: "HBnB - Luxe Airbnb Clone",
    cardDescription:
      "Portfolio-grade, full-stack Airbnb-style marketplace with Stripe payments, JWT auth, and host/guest flows.",
    cardTags: ["React 19", "Flask", "Tailwind CSS", "TiDB", "Stripe", "JWT"],
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
]

export const projectsBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project])
) as Record<string, Project>
