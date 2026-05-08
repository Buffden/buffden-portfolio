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
        'Full-stack URL shortener with Angular 19 SPA frontend and Spring Boot REST API backend.',
        'Supports custom expiry — users enter a date or number of days for link lifetime.',
        'QR code generation with PNG/SVG download for any shortened or custom URL.',
        'Deployed on AWS with S3 + CloudFront for the SPA, EC2 + ALB for the API, and RDS PostgreSQL for persistence.',
        'Secured behind Cloudflare for DNS, DDoS protection, and SSL termination.',
        'CI/CD pipeline via GitHub Actions — automated build and deploy on every push.',
      ],
      image: 'assets/images/tinyurl-landing-page.png',
      github: [
        'https://github.com/Buffden/tinyurl-api'
      ],
      external: 'https://tinyurl.buffden.com/',
      tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS EC2', 'AWS RDS', 'CloudFront', 'S3', 'Docker', 'Cloudflare', 'GitHub Actions'],
    },
    {
      title: 'Employee Management System',
      type: 'Featured Project',
      descriptionPoints: [
        'Built with Angular 19 UI and Spring Boot REST API backend.',
        'Enables management of employees, departments, and roles.',
        'Implements JWT authentication and role-based access control.',
        'Dockerized for easy deployment on AWS EC2.',
        'Features a clean codebase, CI-ready, and fully documented.',
      ],
      image: 'assets/images/ems-landing-page.png',
      github: [
        'https://github.com/Buffden/employee-management-system'
      ],
      external: 'https://ems.buffden.com/',
      tech: ['Angular', 'Spring Boot', 'JWT', 'Docker', 'AWS EC2'],
    },
    {
      title: 'RingNet — Graph-Based Fraud Ring Detection',
      type: 'Featured Project',
      descriptionPoints: [
        'Demonstrates why fraud ring detection is fundamentally a graph problem, not a SQL problem.',
        'Models financial entities as a property graph with 6 node types: Account, Phone, Email, Device, Address, and Transaction.',
        'Generates a synthetic fraud dataset with 3 planted rings (5, 8, and 12 accounts) — 150 total accounts, zero false positives.',
        'Progressive Cypher queries from basic traversal to composite risk scoring using Neo4j Graph Data Science.',
        'Includes architectural decision record comparing graph traversal vs. SQL recursive CTEs at scale.',
        'Fully containerized with Docker Compose; data generation and loading via Java with Neo4j Java Driver.',
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
