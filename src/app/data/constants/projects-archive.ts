export interface MiniProject {
  title: string;
  period?: string;
  tech: string[];
  description: string;
  github?: string[];
  external?: string;
}

export const miniProjects: MiniProject[] = [
  {
    title: 'TinyURL — URL Shortener',
    period: 'Feb 2026 – Mar 2026',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS EC2', 'AWS RDS', 'CloudFront', 'S3', 'Lambda', 'Docker', 'Cloudflare', 'GitHub Actions'],
    description: `Production-grade URL shortener with Base62 short codes, server-enforced expiry (301/302/410), QR code export, and a serverless Lambda + EventBridge expiry scheduler that cut monthly costs by ~40%. Six-layer security (Cloudflare WAF → Nginx rate limiting → Bucket4j cap → split DB users); zero-credential CI/CD via GitHub Actions OIDC with cosign-signed images and KMS-encrypted secrets.`,
    github: ['https://github.com/Buffden/tinyurl-api'],
    external: 'https://tinyurl.buffden.com/',
  },
  {
    title: 'Employee Management System',
    period: 'Dec 2024 – May 2025',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Redis', 'JWT', 'Docker', 'AWS EC2', 'GitHub Actions'],
    description: `Full-stack HR platform for employee lifecycle, department, project/task, and location management with a normalized PostgreSQL schema. Three-tier RBAC (SYSTEM_ADMIN / HR_MANAGER / EMPLOYEE), JWT in HTTP-Only cookies, BCrypt hashing, Nginx + Redis rate limiting, and blue-green zero-downtime deployment on AWS RDS.`,
    github: ['https://github.com/Buffden/employee-management-system'],
    external: 'https://ems.buffden.com/',
  },
  {
    title: 'RingNet — Graph-Based Fraud Ring Detection',
    period: 'Apr 2026 – Present',
    tech: ['Neo4j', 'Java', 'Cypher', 'Graph Data Science', 'Docker', 'Maven'],
    description: `Fraud ring detection as a graph problem — shared identifiers as first-class nodes enable constant-complexity Cypher traversals where SQL recursive CTEs grow exponentially. 150-account synthetic dataset with 3 planted rings; all 25 fraud accounts detected with zero false positives across five query levels up to Neo4j GDS composite risk scoring.`,
    github: ['https://github.com/Buffden/ringnet'],
  },
  {
    title: 'Battle Arena – Real-Time Multiplayer Platform',
    period: 'May 2025 – Present',
    tech: ['Angular', 'Phaser 3', 'Spring Boot', 'Node.js', 'MongoDB', 'Docker'],
    description: `Turn-based browser artillery game with real-time WebSocket sync; Phaser 3 + Matter.js for physics (10 weapons per match), Angular 17 for UI. Five microservices (JWT + Google OAuth auth, profiles, leaderboards, matchmaking, game engine) backed by Redis caching, MongoDB, and an Nginx gateway.`,
    github: ['https://github.com/Buffden/battle-arena'],
    external: 'https://github.com/Buffden/battle-arena',
  },
  {
    title: 'Event Management System',
    period: 'Sep 2025 – Nov 2025',
    tech: [
      'Next.js',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
    ],
    description: `Full event lifecycle platform — registration, digital ticketing, QR check-in, real-time tracking, multi-track scheduling, speaker management, automated notifications, and post-event analytics. Six Node.js/TypeScript microservices behind Nginx with a Next.js SSR frontend; deployed on Docker Compose locally and Kubernetes in production.`,
    github: ['https://github.com/Buffden/Event-Management-System'],
  },
  {
    title: 'AI-Powered Personal Finance Manager',
    period: 'Mar 2025 – Apr 2025',
    tech: ['Streamlit', 'Flask', 'OpenAI', 'Plaid API', 'Docker', 'AWS RDS'],
    description: `Plaid-connected finance manager that auto-categorizes transactions, suggests budgets, scans receipts via GPT-4 Vision, and answers questions through a conversational chatbot. Includes trend analysis, anomaly detection, bill reminders, and exportable reports — Streamlit + Altair frontend, Flask API, AWS RDS backend.`,
    github: ['https://github.com/Buffden/AI-Powered-Personal-Finance-Manager'],
  },

  {
    title: 'Better Finance – Hackathon Project (UTA)',
    period: 'Mar 2025',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn-ui'],
    description: `Hackathon project (UTA, Mar 2025) — AI-powered personal finance platform with bank sync, OCR invoice processing, and a spending analytics dashboard, built with React, TypeScript, Vite, and Tailwind CSS.`,
    github: ['https://github.com/Buffden/Better-Finance'],
  },
  {
    title: 'Secure Phone Book REST API',
    period: 'Oct 2024 – Nov 2024',
    tech: ['FastAPI', 'Spring Boot', 'Docker', 'SQLite', 'JWT'],
    description: `Contact management API rebuilt across four stacks (FastAPI, Spring Boot, ASP.NET, Go) to contrast security primitives — regex input validation, role-based auth, and full audit logging. Unit tests explicitly assert protection against XSS, SQL injection, and privilege escalation.`,
    github: ['https://github.com/Buffden/input-validation-secure-programming'],
  },
  {
    title: 'RSA Encryption & Signature Lab',
    period: 'Mar 2026 – Apr 2026',
    tech: ['Java', 'Maven', 'RSA-OAEP', 'RSA-PSS', 'X.509', 'GCP'],
    description: `RSA implemented from first principles in Java — key derivation via Euler's Totient, manual modular exponentiation, and signatures demonstrating the avalanche effect — with zero external dependencies. Validates live X.509 certificates against real HTTPS servers using java.security APIs; migration to RSA-OAEP and RSA-PSS in progress on GCP.`,
    github: ['https://github.com/Buffden/rsa-encryption-signature-lab'],
  },
  {
    title: 'Spider Squash – Chrome Extension',
    period: 'Sep 2022',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Chrome API'],
    description: `Chrome extension game — spiders spawn randomly on any webpage; click to squash before they disappear. Score persists via local storage with progressive difficulty scaling.`,
    github: ['https://github.com/Buffden/spider-squash-chrome-extension'],
  },
];
