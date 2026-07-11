export const contact = {
  name: "Mohammed Afil Farhan",
  title: "AI & ML Specialist · Data Engineer",
  email: "afilfarhan0008@gmail.com",
  phone: "+966 557337857",
  location: "Riyadh, Saudi Arabia",
  github: "https://github.com/afilfarhan",
  resumePdf: "/Afil%20Farhan%20Resume.pdf",
}

export const summary =
  "AI Engineer and Machine Learning specialist with a Master's in Artificial Intelligence from Heriot-Watt University, experienced in building production-grade multi-agent systems, RAG pipelines, and full-stack AI applications. Proficient in Python and JavaScript/TypeScript, with a track record of shipping scalable, user-centric automation solutions across startups and enterprise environments, leveraging tools like LangChain and REST APIs."

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  highlights: string[]
}

export const experience: Experience[] = [
  {
    role: "Cloud Engineer",
    company: "Bejoice Shipping L.L.C",
    location: "Dammam, KSA",
    period: "Jan 2025 – Jun 2026",
    highlights: [
      "Built ETL/ELT pipelines and data quality frameworks",
      "Implemented GDPR-aligned data validation",
      "Automated workflows and optimized query performance",
    ],
  },
  {
    role: "AI Engineer",
    company: "Optima Partners",
    location: "Scotland, UK",
    period: "Sep 2023 – Dec 2024",
    highlights: [
      "Built multi-agent LLM systems with LangChain",
      "Shipped production RAG pipelines with vector databases",
      "Owned the end-to-end LLM lifecycle",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Yenapoya Incubator",
    location: "India",
    period: "Apr 2022 – Jun 2022",
    highlights: [
      "Built front-end UI for 3 internal projects",
      "Improved SQL query performance",
      "Automated document generation with PHP/TCPDF",
    ],
  },
]

export interface SkillGroup {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "Kotlin", "PHP"],
  },
  {
    category: "Machine Learning & AI",
    skills: [
      "LangChain",
      "Multi-agent LLM systems",
      "RAG pipelines",
      "Vector databases",
      "Prompt engineering",
      "Transformers",
      "ONNX Runtime",
      "MediaPipe",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Vercel", "Cloud Technology", "CI/CD", "GDPR compliance"],
  },
  {
    category: "Databases",
    skills: ["SQL databases", "Redis", "Vector DBs"],
  },
  {
    category: "Tools & IDEs",
    skills: ["Git", "VS Code", "Furhat SDK", "NVIDIA NIM", "Claude Code", "cursor"],
  },
  {
    category: "Web Technologies",
    skills: ["REST APIs", "React", "Next.js", "Node.js", "HTML/CSS"],
  },
  {
    category: "Data Engineering / Big Data",
    skills: ["ETL/ELT pipelines", "Data quality frameworks", "Query optimization", "Data validation"],
  },
]

export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  badge?: string
}

export const projects: Project[] = [
  {
    title: "Hybrid-RAG",
    description:
      "Production RAG pipeline combining retrieval strategies for grounded, accurate LLM responses.",
    tags: ["Python", "RAG", "LangChain", "Vector DB"],
    github: "https://github.com/afilfarhan/Hybrid-RAG",
    badge: "production",
  },
  {
    title: "SentinelChain",
    description: "Multi-agent AI system coordinating specialized agents for complex task execution.",
    tags: ["Python", "Multi-agent", "LLM", "Agents"],
    github: "https://github.com/afilfarhan/myagenticai",
  },
  {
    title: "marcazi.com RAG Chatbot",
    description:
      "Production-grade digital commerce marketplace: ReAct agent architecture, Redis caching, anti-hallucination guardrails, and real-time product discovery.",
    tags: ["ReAct", "Redis","Postgres"],
    live: "https://marcazi.com",
    badge: "production",
  },
  {
    title: "SignTutor / ASL Recognition",
    description:
      "Real-time American Sign Language recognition running entirely in-browser with no backend: MediaPipe hand/body tracking and a Transformer-based model on ONNX Runtime detecting signs and full sentences from live webcam input.",
    tags: ["MediaPipe", "ONNX Runtime", "Transformers", "WebML"],
    badge: "no backend / on-device",
  },
  {
    title: "AI Template Builder",
    description:
      "Five-agent generation pipeline built on NVIDIA NIM with anti-hallucination constraints.",
    tags: ["NVIDIA NIM", "Multi-agent", "Python"],
  },
  {
    title: "Furhat Social Robot — Master's Thesis",
    description:
      "Multimodal conversational AI (GPT-3.5 + Furhat SDK): prompt engineering and few-shot learning for gesture prediction, ASR/NLU/TTS integration in Kotlin/Python, evaluated via WER analysis and user studies.",
    tags: ["GPT-3.5", "Furhat SDK", "Kotlin", "Python", "ASR/NLU/TTS"],
  },
]

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  result: string
}

export const education: Education[] = [
  {
    degree: "MSc Artificial Intelligence",
    institution: "Heriot-Watt University",
    location: "United Kingdom",
    period: "2022 – 2023",
    result: "Graduated with Merit",
  },
  {
    degree: "BCA Cloud Technology & Information Security",
    institution: "Srinivas University",
    location: "India",
    period: "2019 – 2022",
    result: "8.6/10 CGPA",
  },
]
