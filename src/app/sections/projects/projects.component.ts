import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';

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
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;
  @ViewChildren('miniProjectCard') miniProjectCards!: QueryList<ElementRef>;

  projects: Project[] = [
    {
      title: `<a href='https://ems.buffden.com/' target='_blank'> Employee Management System</a>`,
      type: 'Featured Project',
      descriptionPoints: [
        'Built with Angular 17 UI and Spring Boot REST API backend.',
        'Enables management of employees, departments, and roles.',
        'Implements JWT authentication and role-based access control.',
        'Dockerized for easy deployment on AWS EC2.',
        'Features a clean codebase, CI-ready, and fully documented.',
      ],
      image: 'assets/images/ems-landing-page.png',
      github: [
        'https://github.com/Buffden/employee-management-system'
      ],
      tech: ['Angular', 'Spring Boot', 'JWT', 'Docker', 'AWS EC2'],
    },
    {
      title: 'Battle Arena – Multiplayer Artillery Game Platform',
      type: 'Featured Project',
      descriptionPoints: [
        'Real-time multiplayer artillery game inspired by Pocket Tanks.',
        'Uses microservices architecture for auth, matchmaking, and game engine.',
        'Built with Phaser 3 and Angular 17 for browser-based 2D gameplay.',
        'Uses Spring Boot REST APIs and Node.js with Socket.io for backend.',
        'Features a Dockerized, scalable, and fully modular architecture.',
      ],
      image: 'assets/images/battle-arena-new.png',
      github: ['https://github.com/Buffden/battle-arena'],
      tech: [
        'Angular',
        'Phaser 3',
        'Spring Boot',
        'Node.js',
        'MongoDB',
        'Docker',
      ],
    },
    {
      title: 'AI-Powered Personal Finance Manager',
      type: 'Featured Project',
      descriptionPoints: [
        'Securely links bank accounts via Plaid API.',
        'AI automatically categorizes expenses and suggests budgets.',
        'Features a chatbot and receipt scanning powered by OpenAI.',
        'Includes interactive dashboards for budgets and analytics.',
        'Built with Flask backend, Streamlit frontend, and Dockerized stack.',
      ],
      image: 'assets/images/ai-finance-manager.png',
      github: ['https://github.com/Buffden/AI-Powered-Personal-Finance-Manager'],
      tech: [
        'Streamlit',
        'Flask',
        'OpenAI',
        'Plaid API',
        'Docker',
        'AWS RDS',
      ],
    },
    {
      title: 'Event Management System',
      type: 'Featured Project',
      descriptionPoints: [
        'Comprehensive web platform for end-to-end event lifecycle management.',
        '9 NestJS microservices with Next.js frontend and PostgreSQL database.',
        'Features: registration, digital ticketing, QR validation, real-time tracking.',
        'Containerized deployment with Docker Compose and Kubernetes.',
        'Built as part of CSE 5325 Software Engineering II course.',
      ],
      image: 'assets/images/event-management-system-landing-page.png',
      github: ['https://github.com/Buffden/Event-Management-System'],
      tech: [
        'Next.js',
        'NestJS',
        'TypeScript',
        'PostgreSQL',
        'Docker',
        'Kubernetes',
      ],
    },
  ];

  dummyProjects = Array(6).fill({});

  miniProjects = [
    
    {
      title: 'Better Finance – Hackathon Project (UTA)',
      period: 'Hackathon - Mar 2025',
      tech: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'shadcn-ui',
      ],
      description:
        `Full-stack AI-powered personal finance platform with real-time bank synchronization, OCR invoice processing, and analytics dashboard.`,
    },
    {
      title: 'Secure Phone Book REST API',
      period: 'Oct 2024 - Nov 2024',
      tech: [
        'FastAPI',
        'Spring Boot',
        'Docker',
        'SQLite',
        'JWT',
      ],
      description:
        `REST API using industrial security practices with regex-based input validation, role-based authentication, and audit logging to prevent XSS and SQL injection attacks.`,
    },
    {
      title: 'Spider Squash – Chrome Extension',
      period: 'Sep 2022',
      tech: ['JavaScript', 'HTML5', 'CSS3', 'Chrome API'],
      description:
        `Interactive browser game extension with random spider spawns, click-to-squash gameplay, score tracking, and progressive difficulty levels.`,
    },
  ];

  constructor(private scrollReveal: ScrollRevealService) {}

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
}
