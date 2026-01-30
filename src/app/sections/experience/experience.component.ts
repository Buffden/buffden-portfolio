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
      company: 'Clarivate Analytics',
      companyUrl: 'https://clarivate.com',
      position: 'Software Engineer',
      duration: 'Aug 2023 – Aug 2024',
      responsibilities: [
        'Designed scalable Spring Boot REST APIs with DTO contracts and standardized error handling, reducing breaking changes by 30% across releases.',
        'Containerized and built deployment pipelines using Docker, Jenkins, and Spinnaker, supporting 50+ production releases with zero rollbacks.',
        'Proactively identified performance bottlenecks in reporting services and optimized API and cache layers, reducing response latency by 25–35%.',
        'Implemented role-based access control across backend and frontend layers, enforcing tiered and region-based data visibility for 10+ access variants.',
        'Designed and implemented low-latency typeahead and autocomplete services, improving search response times by ~40% over large-scale datasets.',
        'Architected a highly configurable, reusable Angular table framework adopted across 3 internal teams, reducing duplicated frontend effort by ~50%.',
        'Built reusable, aggregation-driven Angular chart components using D3.js, powering 15+ analytics views for interactive reporting services.',
        'Developed dynamic PPT and PDF export pipelines, generating 100+ customized reports with user-selected filters, layouts, and metadata.'
      ]
    },
    {
      company: 'Clarivate Analytics',
      companyUrl: 'https://clarivate.com',
      position: 'Associate Software Engineer',
      duration: 'Aug 2021 – Jul 2023',
      responsibilities: [
        'Optimized frontend rendering and state management for data-heavy views, improving responsiveness of interactive charts and tables by ~20–25%.',
        'Implemented and optimized PostgreSQL schemas, queries, and indexing strategies, improving query performance by 40% for analytics services.',
        'Integrated Elasticsearch into Spring Boot to provide fast, advanced queries across millions of drug records, reducing search latency by 30%.',
        'Improved frontend performance by minimizing unnecessary re-renders and optimizing data-fetching patterns, resulting in ~20% faster page loads.',
        'Migrated a legacy client-side component to an Angular 13 application, rebuilding 5+ core business flows with a modular architecture.',
        'Implemented secure request-handling mechanisms, including JWT authentication, CORS/CSRF protection, and input validation in multiple services.',
        'Developed reusable Angular UI components, including charts and advanced table views, reused across multiple reporting modules consistently.'
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
