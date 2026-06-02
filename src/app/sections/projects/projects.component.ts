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
        'Angular 19 SPA on AWS (S3 + CloudFront + ALB + EC2 + RDS) backed by a Spring Boot API — Base62 short codes, server-enforced expiry with correct redirect semantics (301/302/410), and QR code export.',
        'Defense-in-depth security: Cloudflare WAF → Nginx rate zones → Bucket4j cap → split DB users; secrets in AWS SSM (KMS-encrypted); zero-credential CI/CD via GitHub Actions OIDC.',
        'Serverless expiry scheduler (Lambda + EventBridge + SNS/SQS DLQ) cut monthly EC2/RDS costs by ~40%; Flyway migrations, Testcontainers, Prometheus, and CloudWatch.',
      ],
      image: 'assets/images/tinyurl-landing-page.png',
      github: [
        'https://github.com/Buffden/tinyurl-api'
      ],
      external: 'https://tinyurl.buffden.com/',
      tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS EC2', 'AWS RDS', 'ALB', 'CloudFront', 'S3', 'Lambda', 'EventBridge', 'SNS', 'SQS', 'Docker', 'Cloudflare', 'GitHub Actions'],
    },
    {
      title: 'Employee Management System',
      type: 'Featured Project',
      descriptionPoints: [
        'Spring Boot REST APIs across 5 entity types with pagination, filtering, and search; Angular 19 frontend with reusable table components, reactive forms, and route guards.',
        'Three-tier RBAC (SYSTEM_ADMIN / HR_MANAGER / EMPLOYEE) — JWT in HTTP-Only cookies, BCrypt hashing, secrets via AWS Secrets Manager, multi-layer rate limiting via Nginx and Redis.',
        'Blue-green zero-downtime deployment via GitHub Actions; Docker Hub images, AWS RDS PostgreSQL with automated backups.',
      ],
      image: 'assets/images/ems-landing-page.png',
      github: [
        'https://github.com/Buffden/employee-management-system'
      ],
      external: 'https://ems.buffden.com/',
      tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Redis', 'JWT', 'Nginx', 'Docker', 'AWS EC2', 'GitHub Actions'],
    },
    {
      title: 'RingNet — Graph-Based Fraud Ring Detection',
      type: 'Featured Project',
      descriptionPoints: [
        'Fraud ring detection as a graph traversal problem — shared identifiers as first-class nodes enable up-to-6-hop Cypher traversals that stay constant-complexity where SQL recursive CTEs grow exponentially.',
        '150-account synthetic dataset, 3 planted rings — all 25 fraud accounts detected with zero false positives; GDS composite risk scoring weighted by hop distance, identifier overlap, and transaction velocity.',
        'Includes ADR, fraud theory primer, and SQL vs. Cypher comparison docs; fully containerized with Docker Compose.',
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
