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
        'Delivered end-to-end features by pairing reusable Angular modules (tables, filters, charts) with Spring Boot REST APIs, ensuring consistent performance and maintainability across apps.',
        'Implemented secure auth with JWT + Spring Security and Angular route guards (RBAC), improving session reliability and reducing unauthorized access incidents.',
        'Optimized PostgreSQL schema and queries for heavy reports, cutting data retrieval times by ~40% and maintaining zero production downtime during releases.',
        'Containerized services with Docker; built CI/CD pipelines in Jenkins/Spinnaker and deployed to AWS (EC2/ECS), standardizing rollouts and reducing release friction.',
        'Refactored legacy monolith areas into modular, reusable components aligned with Clean Architecture and DDD to lower maintenance overhead.',
        'Established robust testing (Jasmine/Karma on FE, JUnit + Postman collections on BE) with ~90%+ coverage, significantly reducing post-release defects.'
      ]
    },
    {
      company: 'Clarivate',
      companyUrl: 'https://clarivate.com',
      position: 'Associate Software Engineer',
      duration: 'October 2021 – July 2023',
      responsibilities: [
        'Developed responsive Angular components with TypeScript and RxJS, improving UX and cross-browser reliability for enterprise workflows.',
        'Built and maintained Spring Boot endpoints and data access layers; contributed indexes/constraints to strengthen data integrity and query performance.',
        'Introduced CI quality gates and test automation in Jenkins, lifting team coverage and shortening feedback loops in PRs.',
        'Collaborated in Agile ceremonies (planning/estimations, reviews, retros) and partnered with UX to ship pixel-perfect, accessible UI.'
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
        'Wrote unit and e2e tests (Jasmine/Protractor), increasing confidence in critical user flows before handoff.',
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
