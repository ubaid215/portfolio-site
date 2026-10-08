export const TECHNOLOGY_AREAS = [
  {
    id: "web",
    title: "Web & digital experience",
    description: "Fast websites and thoughtful interfaces that help people explore, enquire, and buy.",
    tools: ["TypeScript", "React", "Next.js", "Tailwind CSS", "GSAP", "Motion"],
  },
  {
    id: "product",
    title: "SaaS & product engineering",
    description: "The accounts, payments, live updates, and integrations that turn an interface into a working product.",
    tools: ["Node.js", "NestJS", "REST APIs", "WebSockets", "Stripe", "BullMQ"],
  },
  {
    id: "ai",
    title: "AI & workflow automation",
    description: "Connect language models with your tools to build assistants and reduce repetitive work, with room for human review.",
    tools: ["OpenAI API", "Claude API", "LangChain", "n8n"],
  },
  {
    id: "delivery",
    title: "Data & delivery",
    description: "Connected data and repeatable deployments that give your product a foundation for its next release.",
    tools: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "Docker", "Vercel"],
  },
] as const
