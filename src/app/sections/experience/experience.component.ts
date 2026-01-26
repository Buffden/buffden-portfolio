import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';

interface Experience {
  company: string;
  companyUrl: string;
  position: string;
  duration: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChild('experienceSection', { static: true }) experienceSection!: ElementRef;

  activeTabIndex = 0;

  experiences: Experience[] = [
    {
      company: 'Clarivate',
      companyUrl: 'https://clarivate.com',
      position: 'Software Engineer',
      duration: 'August 2023 – July 2024',
      responsibilities: [
        'Delivered reusable Angular modules and Spring Boot APIs for reporting, reducing duplicate code by 80%.',
        'Refactored legacy modules into clean, modular architectures, lowering long-term maintenance costs.',
        'Optimized PostgreSQL schemas and queries, reducing latency by 40% for large-scale analytical reports.',
        'Automated CI/CD pipelines using Docker, Jenkins, and Spinnaker, deploying 50+ releases with zero rollbacks.',
        'Designed and enforced secure authentication using JWT and Spring Security, strengthening access control across services.',
        'Mentored two junior engineers through pair programming and code reviews, doubling sprint throughput.'
      ]
    },
    {
      company: 'Clarivate',
      companyUrl: 'https://clarivate.com',
      position: 'Associate Software Engineer',
      duration: 'October 2021 – July 2023',
      responsibilities: [
        'Built Angular charts and reusable table components integrated with Spring Boot APIs for advanced search and reporting features.',
        'Bootstrapped an Angular frontend application with Dockerized CI/CD pipelines, enabling automated builds and AWS deployments.',
        'Standardized reusable frontend modules adopted across five or more teams, reducing onboarding time by 50%.',
        'Optimized PostgreSQL queries and indexing strategies, improving data retrieval performance by 30%.',
        'Implemented secure authentication and request-handling mechanisms (JWT, CORS, CSRF protection), along with input validation standards.',
        'Increased test coverage to over 90% using Jasmine and JUnit, reducing production defects by 25%.',
        'Deployed containerized applications to AWS ECS/EC2 with hardened security group configurations.'
      ]
    },
    {
      company: 'Clarivate',
      companyUrl: 'https://clarivate.com',
      position: 'Software Engineer Intern',
      duration: 'August 2021 – October 2021',
      responsibilities: [
        'Developed a full-stack survey design tool using Angular frontend, Spring Boot REST APIs, and PostgreSQL database, demonstrating end-to-end development capabilities.',
        'Implemented AWS CI/CD pipeline with Jenkins and Spinnaker for automated testing, building, and deployment, gaining hands-on DevOps experience.',
        'Contributed Angular feature work and bug fixes while learning team conventions for scalable state management and API integration.',
        'Wrote unit and e2e tests (Jasmine & JUnit), increasing confidence in critical user flows before handoff.',
        'Participated in code reviews and followed Git branching/PR standards to maintain code quality.'
      ]
    }
  ];

  constructor(private scrollReveal: ScrollRevealService) {}

  ngAfterViewInit() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      this.scrollReveal.reveal(this.experienceSection.nativeElement, srConfig());
    }
  }

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }
}
