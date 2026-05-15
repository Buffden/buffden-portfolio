import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';
import { Router, RouterLink } from '@angular/router';

interface Project {
  title: string;
  type: string;
  descriptionPoints: string[];
  image: string;
  github?: string[];
  external?: string;
  tech: string[];
  links?: { label: string; url: string }[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;
  @ViewChildren('miniProjectCard') miniProjectCards!: QueryList<ElementRef>;

  projects: Project[] = [
    {
      title: 'TinyURL — URL Shortener',
      type: 'Featured Project',
      descriptionPoints: [
        'Full-stack URL shortener: Angular 19 SPA on AWS (S3 + CloudFront, ALB + EC2, RDS PostgreSQL) backed by a stateless Spring Boot API — Base62-encoded short codes, server-enforced expiry, and correct redirect semantics (301 permanent / 302 expiring / 410 Gone). On-demand QR code export in PNG and SVG.',
        'Security-first with defense-in-depth across six layers: Cloudflare WAF → Nginx per-IP rate zones → Bucket4j application cap → least-privilege split DB users. Secrets in AWS SSM Parameter Store (KMS-encrypted); zero-credential CI/CD via GitHub Actions OIDC with cosign-signed Docker images.',
        'Serverless expiry scheduler via AWS Lambda + EventBridge with SNS/SQS DLQ, reducing monthly infrastructure costs by ~40%; Flyway migrations, JUnit 5 + Testcontainers, Prometheus metrics, and CloudWatch logging.',
      ],
      image: 'assets/images/tinyurl-landing-page.png',
      github: [
        'https://github.com/Buffden/tinyurl-api'
      ],
      external: 'https://tinyurl.buffden.com/',
      tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS EC2', 'AWS RDS', 'CloudFront', 'S3', 'Lambda', 'Docker', 'Cloudflare', 'GitHub Actions'],
    },
    {
      title: 'Employee Management System',
      type: 'Featured Project',
      descriptionPoints: [
        'Full-stack HR platform: employee lifecycle, department management, project and task tracking, and location management — Spring Boot REST API with layered architecture, Angular 19 frontend with reactive forms and route guards.',
        'Three-tier RBAC (SYSTEM_ADMIN / HR_MANAGER / EMPLOYEE) with JWT in HTTP-Only cookies (XSS protection), BCrypt hashing, CORS protection, and multi-layer rate limiting via Nginx and Redis.',
        'Blue-green zero-downtime deployment via GitHub Actions on every merge to main; Docker Hub for images, AWS RDS PostgreSQL with automated backups.',
      ],
      image: 'assets/images/ems-landing-page.png',
      github: [
        'https://github.com/Buffden/employee-management-system'
      ],
      external: 'https://ems.buffden.com/',
      tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Redis', 'JWT', 'Docker', 'AWS EC2', 'GitHub Actions'],
    },
    {
      title: 'RingNet — Graph-Based Fraud Ring Detection',
      type: 'Featured Project',
      descriptionPoints: [
        'Fraud ring detection as a graph traversal problem — shared identifiers modeled as first-class nodes, enabling constant-complexity Cypher traversals where SQL recursive CTEs grow exponentially with hop depth.',
        'Synthetic dataset: 150 accounts (125 legitimate, 25 fraud), 450 transactions, 3 planted rings (5, 8, 12 members) — all 25 fraud accounts detected with zero false positives across five query levels: basic traversal → multi-identifier overlap → N-hop ring detection → velocity checks → Neo4j GDS composite risk scoring.',
        'Three system design documents (ADR, fraud theory primer, SQL vs. Cypher comparison); fully containerized with Docker Compose — reproducible from a single command.',
      ],
      image: 'assets/images/ringnet-graph.svg',
      github: ['https://github.com/Buffden/ringnet'],
      tech: [
        'Neo4j',
        'Java',
        'Cypher',
        'Graph Data Science',
        'Docker',
        'Maven',
      ],
    },
  ];

  constructor(private scrollReveal: ScrollRevealService, private router: Router) {}

  ngAfterViewInit() {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!prefersReducedMotion) {
      this.projectCards.forEach((card, idx) => {
        this.scrollReveal.reveal(
          card.nativeElement,
          srConfig(200 + idx * 100)
        );
      });
      this.miniProjectCards.forEach((card, idx) => {
        this.scrollReveal.reveal(
          card.nativeElement,
          srConfig(200 + idx * 100)
        );
      });
    }
  }

  onArchiveClick(event: Event): void {
    this.router.navigate(['/project/archive']).then(() => {
      requestAnimationFrame(() => {
        document.getElementById('project-archive')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
}
