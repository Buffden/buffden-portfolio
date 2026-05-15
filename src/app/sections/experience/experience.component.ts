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
      duration: 'Aug 2023 – Jul 2024',
      responsibilities: [
        'Developed scalable Spring Boot REST APIs with DTO contracts and standardized error handling, reducing breaking changes by 30% across releases.',
        'Implemented JWT-based multi-session management across backend services, capping concurrent logins at 12 per user with token invalidation on breach.',
        'Optimized PostgreSQL schemas with composite indexing across reporting and search workloads for drug and patent datasets, cutting full scans.',
        'Containerized and deployed microservices to EC2 using Docker and Jenkins CI/CD pipelines, supporting 50+ production releases with zero rollbacks.',
        'Enforced role-based access control across backend and frontend layers, applying tiered and region-based data visibility for 10+ access variants.',
        'Implemented low-latency Elasticsearch-powered typeahead and autocomplete, improving search response times by 40% over large-scale datasets.',
        'Developed dynamic PPT and PDF export pipelines using PptxGenJS and jsPDF, generating 100+ customized reports with user-selected filters.',
        'Optimized PostgreSQL query logic for PPT export, decoupling bulk multi-filter chart fetching from single-chart UI rendering to reduce DB round-trips.',
        'Achieved 90% test coverage using JUnit and Mockito for backend and Jasmine for Angular, covering unit, branch, and line coverage across all modules.'
      ]
    },
    {
      company: 'Clarivate Analytics',
      companyUrl: 'https://clarivate.com',
      position: 'Associate Software Engineer',
      duration: 'Aug 2021 – Jul 2023',
      responsibilities: [
        'Integrated Elasticsearch into Spring Boot, enabling advanced full-text queries across millions of drug records and reducing search latency by 30%.',
        'Migrated 5+ core business flows from Angular 8 to Angular 13, rebuilding components with a modular architecture and improved state management.',
        'Built secure request-handling across backend services using Spring Security, CORS/CSRF, and input validation to guard against unauthorized access.',
        'Improved responsiveness of data-heavy chart and table views by 20–25% through lazy loading, RxJS streams, and Angular lifecycle optimizations.',
        'Reduced page load times by 20% by applying component-level OnPush change detection and optimizing data-fetching patterns across data-heavy views.',
        'Built D3.js chart components with grouping and filtering aggregations for Angular, powering 15+ analytics views across drug intelligence dashboards.',
        'Architected a configurable Angular table framework with sorting, pagination, and filters; adopted across 3 internal teams, cutting duplication by 50%.'
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
