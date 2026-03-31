export interface MiniProject {
  title: string;
  period: string;
  tech: string[];
  description: string;
  github?: string[];
  external?: string;
}

export const miniProjects: MiniProject[] = [
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
    title: 'Spider Squash – Chrome Extension',
    period: 'Sep 2022',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Chrome API'],
    description: `Interactive browser game extension with random spider spawns, click-to-squash gameplay, score tracking, and progressive difficulty levels.`,
    github: ['https://github.com/Buffden/spider-squash-chrome-extension'],
  },
];
