import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';

interface Project {
  title: string;
  type: string;
  description: string;
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
      description: `
        • Angular 17 UI and Spring Boot REST API backend.<br>
        • Manage employees, departments, and roles.<br>
        • JWT authentication and role-based access.<br>
        • Dockerized for easy deployment on AWS EC2.<br>
        • Clean codebase, CI-ready, and fully documented.<br>
      `,
      image: 'assets/images/ems-landing-page.png',
      github: [
        'https://github.com/Buffden/employee-management-system'
      ],
      tech: ['Angular', 'Spring Boot', 'JWT', 'Docker', 'AWS EC2'],
    },
    {
      title: 'Battle Arena – Multiplayer Artillery Game Platform',
      type: 'Featured Project',
      description: `
        • Real-time multiplayer artillery game inspired by Pocket Tanks.<br>
        • Microservices for auth, matchmaking, and game engine.<br>
        • Phaser 3 + Angular 17 for browser-based 2D gameplay.<br>
        • Spring Boot REST APIs and Node.js + Socket.io for backend.<br>
        • Dockerized, scalable, and fully modular architecture.
      `,
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
      description: `
        • Securely links bank accounts via Plaid API.<br>
        • AI auto-categorizes expenses and suggests budgets.<br>
        • Chatbot and receipt scanning with OpenAI.<br>
        • Interactive dashboards for budgets and analytics.<br>
        • Flask backend, Streamlit frontend, Dockerized stack.<br>
        <a href='https://github.com/Buffden/AI-Powered-Personal-Finance-Manager' target='_blank'>GitHub Repo</a>
      `,
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
      description: `
        • Comprehensive web platform for end-to-end event lifecycle management.<br>
        • 9 NestJS microservices with Next.js frontend and PostgreSQL database.<br>
        • Features: registration, digital ticketing, QR validation, real-time tracking.<br>
        • Containerized deployment with Docker Compose and Kubernetes.<br>
        • Built as part of CSE 5325 Software Engineering II course.<br>
        <a href='https://github.com/Buffden/Event-Management-System' target='_blank'>GitHub Repository</a>
      `,
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
      title: 'Backend API + AWS IaC Deployment (Simulated)',
      period: 'Sep 2024 - Dec 2025',
      tech: [
        'ASP.NET Core',
        'AWS CDK',
        'GitHub Actions',
        'Docker',
        'EC2',
        'S3',
        'Lambda',
      ],
      description:
        `Secure, RESTful microservices in C# with AWS CDK infrastructure and automated CI/CD for simulated collaborative file editing.`,
    },
    {
      title: 'Better Finance – Hackathon Project (UTA)',
      period: 'Hackathon - Mar 2025',
      tech: [
        'Angular',
        'Flask',
        'Streamlit',
        'PostgreSQL',
        'Plaid API',
        'Docker',
      ],
      description:
        `Full-stack AI-powered personal finance platform with real-time bank sync, OCR invoice processing, and analytics dashboard.`,
    },
    {
      title: 'Survey Design Tool – Clarivate Analytics',
      period: 'August - October 2021',
      tech: ['Angular', 'Spring Boot', 'MySQL', 'D3.js', 'Jenkins'],
      description:
        `Dynamic survey builder with real-time analytics and AI-driven data visualization for HR and healthcare workflows.`,
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
