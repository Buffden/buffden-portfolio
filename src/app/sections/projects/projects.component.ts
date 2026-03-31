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
      title: 'Battle Arena – Multiplayer Artillery Game Platform',
      type: 'Featured Project',
      descriptionPoints: [
        'Real-time multiplayer artillery game inspired by Pocket Tanks.',
        'Uses microservices architecture for auth, matchmaking, and game engine.',
        'Built with Phaser 3 and Angular 21 for browser-based 2D gameplay.',
        'Uses Spring Boot REST APIs and Node.js with Socket.io for backend.',
        'Features a Dockerized, scalable, and fully modular architecture.',
      ],
      image: 'assets/images/battle-arena-new.png',
      github: ['https://github.com/Buffden/battle-arena'],
      external: 'https://github.com/Buffden/battle-arena',
      tech: [
        'Angular',
        'Phaser 3',
        'Spring Boot',
        'Node.js',
        'MongoDB',
        'Docker',
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
