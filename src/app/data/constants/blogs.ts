export interface Blog {
  title: string;
  platform: string;
  date: string;
  year: number;
  tags: string[];
  summary: string;
  link: string;
}

export const blogs: Blog[] = [
  {
    title: 'Stop Manually Exporting PlantUML Diagrams — Automate It with diagram-sync',
    platform: 'Medium',
    date: 'May 2026',
    year: 2026,
    tags: ['CLI', 'TypeScript', 'npm', 'PlantUML', 'Mermaid', 'DevOps'],
    summary: 'Engineering teams update code but forget to re-export architecture diagrams. This article walks through building and publishing diagram-sync — a zero-config npm CLI that recursively discovers PlantUML and Mermaid files and auto-exports SVGs with path mirroring, ready for CI/CD pipelines.',
    link: 'https://medium.com/@buffden/stop-manually-exporting-plantuml-diagrams-automate-it-with-diagram-sync-67d4f15ab268',
  },
  {
    title: 'Every Fraud Ring Is Invisible Until You Stop Looking at Accounts and Start Looking at Relationships',
    platform: 'LinkedIn',
    date: 'May 2026',
    year: 2026,
    tags: ['Neo4j', 'Graph Databases', 'Fraud Detection', 'Cypher', 'Open Source'],
    summary: 'Fraud detection requires examining relationships, not individual accounts in isolation. This post introduces RingNet — a Neo4j-powered system that models financial entities as interconnected nodes and uses graph traversal to detect fraud rings that SQL recursive CTEs struggle to express.',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7458220397839204353/',
  },
  {
    title: 'How I Cut My AWS Bill from $81/month to $52/month Without Removing a Single Feature',
    platform: 'LinkedIn',
    date: 'Apr 2026',
    year: 2026,
    tags: ['AWS', 'Lambda', 'EventBridge', 'Cost Optimization', 'EC2', 'RDS'],
    summary: 'A 36% AWS cost reduction through architectural decisions: Lambda + EventBridge scheduled EC2/RDS shutdown, t3.micro downgrade, S3/CloudFront SPA hosting, Cloudflare edge filtering, and eliminating orphaned infrastructure. Two further changes could push savings to 64%.',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7453820140271513601/',
  },
  {
    title: 'Writing ADRs Before Writing Code: A Production URL Shortener Case Study',
    platform: 'Medium',
    date: 'Mar 2026',
    year: 2026,
    tags: ['Architecture', 'ADR', 'System Design', 'Spring Boot', 'AWS'],
    summary: 'A case study on using Architecture Decision Records before writing a single line of code for a production URL shortener. Covers the decisions that shaped the six-layer security stack, serverless expiry scheduler, and zero-credential CI/CD pipeline.',
    link: 'https://medium.com/@buffden/writing-adrs-before-writing-code-a-production-url-shortener-case-study-7eea3134fe9c',
  },
  {
    title: 'Building a Production-Grade URL Shortener on AWS: Six Layers Before Your Code Even Runs',
    platform: 'LinkedIn',
    date: 'Mar 2026',
    year: 2026,
    tags: ['AWS', 'System Design', 'Spring Boot', 'Security', 'CloudFront', 'Nginx'],
    summary: 'A deep dive into the TinyURL architecture — six protective layers (Cloudflare → CloudFront → ALB → Nginx → Spring Boot → PostgreSQL) before application code executes. Covers dependency verification, Docker image signing, secrets management, and a three-gate CI/CD pipeline.',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7447693051248046080/',
  },
];
