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
    tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS EC2', 'AWS RDS', 'CloudFront', 'S3', 'Docker', 'Cloudflare', 'GitHub Actions'],
    description: `Full-stack URL shortener with Angular 19 SPA frontend and Spring Boot REST API backend. Supports custom expiry — users enter a date or number of days for link lifetime. QR code generation with PNG/SVG download for any shortened or custom URL. Deployed on AWS with S3 + CloudFront for the SPA, EC2 + ALB for the API, and RDS PostgreSQL for persistence. Secured behind Cloudflare for DNS, DDoS protection, and SSL termination. CI/CD pipeline via GitHub Actions — automated build and deploy on every push.`,
    github: ['https://github.com/Buffden/tinyurl-api'],
    external: 'https://tinyurl.buffden.com/',
  },
  {
    title: 'Employee Management System',
    period: 'Dec 2024 – May 2025',
    tech: ['Angular', 'Spring Boot', 'JWT', 'Docker', 'AWS EC2'],
    description: `Built with Angular 19 UI and Spring Boot REST API backend. Enables management of employees, departments, and roles. Implements JWT authentication and role-based access control. Dockerized for easy deployment on AWS EC2. Features a clean codebase, CI-ready, and fully documented.`,
    github: ['https://github.com/Buffden/employee-management-system'],
    external: 'https://ems.buffden.com/',
  },
  {
    title: 'RingNet — Graph-Based Fraud Ring Detection',
    period: 'May 2026',
    tech: ['Neo4j', 'Java', 'Cypher', 'Graph Data Science', 'Docker', 'Maven'],
    description: `Demonstrates why fraud ring detection is fundamentally a graph problem. Models financial entities as a property graph with 6 node types. Generates a synthetic dataset with 3 planted rings across 150 accounts — all 25 fraud accounts surfaced with zero false positives. Progressive Cypher queries from basic traversal to composite risk scoring. Fully containerized with Docker Compose.`,
    github: ['https://github.com/Buffden/ringnet'],
  },
  {
    title: 'Battle Arena – Real-Time Multiplayer Platform',
    period: 'May 2025 – Present',
    tech: ['Angular', 'Phaser 3', 'Spring Boot', 'Node.js', 'MongoDB', 'Docker'],
    description: `Real-time multiplayer artillery game inspired by Pocket Tanks. Uses microservices architecture for auth, matchmaking, and game engine. Built with Phaser 3 and Angular 21 for browser-based 2D gameplay. Uses Spring Boot REST APIs and Node.js with Socket.io for backend. Features a Dockerized, scalable, and fully modular architecture.`,
    github: ['https://github.com/Buffden/battle-arena'],
    external: 'https://github.com/Buffden/battle-arena',
  },
  {
    title: 'Event Management System',
    period: 'Sep 2025 - Nov 2025',
    tech: [
      'Next.js',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
    ],
    description: `Comprehensive web platform for end-to-end event lifecycle management. 9 NestJS microservices with Next.js frontend and PostgreSQL database. Features: registration, digital ticketing, QR validation, real-time tracking. Containerized deployment with Docker Compose and Kubernetes. Built as part of CSE 5325 Software Engineering II course.`,
    github: ['https://github.com/Buffden/Event-Management-System'],
  },
  {
    title: 'AI-Powered Personal Finance Manager',
    period: 'Mar 2025 - Apr 2025',
    tech: ['Streamlit', 'Flask', 'OpenAI', 'Plaid API', 'Docker', 'AWS RDS'],
    description: `Securely links bank accounts via Plaid API. AI automatically categorizes expenses and suggests budgets. Features a chatbot and receipt scanning powered by OpenAI. Includes interactive dashboards for budgets and analytics. Built with Flask backend, Streamlit frontend, and Dockerized stack.`,
    github: ['https://github.com/Buffden/AI-Powered-Personal-Finance-Manager'],
  },

  {
    title: 'Better Finance – Hackathon Project (UTA)',
    period: 'Hackathon - Mar 2025',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn-ui'],
    description: `Full-stack AI-powered personal finance platform with real-time bank synchronization, OCR invoice processing, and analytics dashboard.`,
    github: ['https://github.com/Buffden/Better-Finance'],
  },
  {
    title: 'Secure Phone Book REST API',
    period: 'Oct 2024 - Nov 2024',
    tech: ['FastAPI', 'Spring Boot', 'Docker', 'SQLite', 'JWT'],
    description: `REST API using industrial security practices with regex-based input validation, role-based authentication, and audit logging to prevent XSS and SQL injection attacks.`,
    github: ['https://github.com/Buffden/input-validation-secure-programming'],
  },
  {
    title: 'RSA Encryption & Signature Lab',
    period: 'Mar 20256 - Apr 2026',
    tech: ['Java', 'Maven', 'RSA-OAEP', 'RSA-PSS', 'X.509', 'GCP'],
    description: `Implemented RSA cryptography from scratch — key generation via Euler's Totient, manual modPow, and digital signatures. Progressed from textbook RSA to production-grade RSA-OAEP and RSA-PSS. Validated real-world X.509 certificates by connecting to live HTTPS servers without automated tools.`,
    github: ['https://github.com/Buffden/rsa-encryption-signature-lab'],
  },
  {
    title: 'Spider Squash – Chrome Extension',
    period: 'Sep 2022',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Chrome API'],
    description: `Interactive browser game extension with random spider spawns, click-to-squash gameplay, score tracking, and progressive difficulty levels.`,
    github: ['https://github.com/Buffden/spider-squash-chrome-extension'],
  },
];
