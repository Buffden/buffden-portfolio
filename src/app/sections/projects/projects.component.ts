import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../shared/analytics.service';

interface Project {
  title: string;
  type: string;
  descriptionPoints: string[];
  image: string;
  github?: string[];
  external?: string;
  tech: string[];
  links?: { label: string; url: string }[];
  npmPackage?: string;
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

  npmDownloads: Record<string, number> = {};

  projects: Project[] = [
    {
      title: 'TinyURL — URL Shortener',
      type: 'Featured Project',
      descriptionPoints: [
        'Angular 19 SPA on AWS (S3 + CloudFront + ALB + EC2 + RDS) backed by a Spring Boot API with Base62 short codes, server-enforced expiry with correct redirect semantics (301/302/410), and QR code export.',
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
      title: 'diagram-sync — Diagram-as-Code CLI',
      type: 'Featured Project',
      descriptionPoints: [
        'Engineered provider-registry architecture mapping 14+ file extensions to isolated rendering adapters with runtime graceful degradation on missing tools.',
        'Developed recursive repo scan, --files, and --changed via git diff HEAD with untracked support, enabling CI to regenerate only PR-changed files.',
        'Architected tiered format resolution across CLI flag, job, and global config with per-provider validation and actionable errors for unsupported formats.',
      ],
      image: 'assets/images/diagram-sync.png',
      github: ['https://github.com/Buffden/diagram-sync'],
      external: 'https://www.npmjs.com/package/diagram-sync',
      tech: ['TypeScript', 'Node.js', 'PlantUML', 'Mermaid', 'Graphviz', 'Draw.io', 'D2', 'Excalidraw', 'BPMN', 'Vitest', 'ESLint', 'GitHub Actions'],
      npmPackage: 'diagram-sync',
    },
    {
      title: 'Employee Management System',
      type: 'Featured Project',
      descriptionPoints: [
        'Spring Boot REST APIs across 5 entity types with pagination, filtering, and search; Angular 19 frontend with reusable table components, reactive forms, and route guards.',
        'Three-tier RBAC (SYSTEM_ADMIN / HR_MANAGER / EMPLOYEE): JWT in HTTP-Only cookies, BCrypt hashing, secrets via AWS Secrets Manager, multi-layer rate limiting via Nginx and Redis.',
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
      title: 'smart-anytool-agent — Research-Backed Tool-Calling Agent',
      type: 'Featured Project',
      descriptionPoints: [
        'Implemented SMART (ACL 2025): a self-awareness layer that determines whether the model can answer from existing knowledge before invoking tools—reducing tool calls by 24% while improving accuracy by 37%.',
        'Implemented AnyTool (ICML 2024): hierarchical tool filtering that categorizes tools and passes only relevant subsets to the LLM, with a self-reflection loop that retries unsuccessful tool invocations.',
        'Built on OpenAI function calling (gpt-4o-mini) with Pydantic argument validation, safe expression evaluation, parallel tool call handling, and real-world integrations (web search, weather).',
      ],
      image: 'https://raw.githubusercontent.com/Buffden/smart-anytool-agent/main/diagrams/docs/architecture.svg',
      github: ['https://github.com/Buffden/smart-anytool-agent'],
      tech: ['Python', 'OpenAI', 'Pydantic', 'httpx', 'DuckDuckGo Search', 'Open-Meteo API'],
      links: [
        { label: 'SMART Paper (ACL 2025)', url: 'https://arxiv.org/abs/2502.11435' },
        { label: 'AnyTool Paper (ICML 2024)', url: 'https://arxiv.org/abs/2402.04253' },
      ],
    },
  ];

  constructor(private scrollReveal: ScrollRevealService, private http: HttpClient, private analytics: AnalyticsService) {
    this.projects
      .filter(p => p.npmPackage)
      .forEach(p => {
        this.http.get<{ downloads: number }>(`https://api.npmjs.org/downloads/point/2020-01-01:2099-12-31/${p.npmPackage}`)
          .subscribe({ next: res => { this.npmDownloads[p.npmPackage!] = res.downloads; } });
      });
  }

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

  getProjectLink(project: Project): string {
    return project.external || project.github?.[0] || '';
  }

  trackProjectClick(title: string, linkType: string, url: string = ''): void {
    this.analytics.trackEvent('project_link_click', { project: title, link_type: linkType, url });
  }

  onArchiveClick(): void {
    this.analytics.trackEvent('project_archive_click');
  }
}
