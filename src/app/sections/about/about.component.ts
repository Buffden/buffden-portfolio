import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';
import { LinkedinBadgeComponent } from '../../shared/linkedin-badge/linkedin-badge.component';
import { AnalyticsService } from '../../shared/analytics.service';

type ParagraphPart =
  | { type: 'text'; content: string }
  | { type: 'link'; content: string; href: string };

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LinkedinBadgeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef;

  aboutParagraphs: ParagraphPart[][] = [
    [
      {
        type: 'text',
        content:
          'My journey into software engineering started with automating a simple math problem and grew into building production systems. At '
      },
      { type: 'link', content: 'Clarivate Analytics', href: 'https://clarivate.com' },
      {
        type: 'text',
        content:
          ', I spent 3+ years across full-stack development, production releases, and data-heavy applications, primarily with Java, Spring Boot, Angular, PostgreSQL, AWS, and Docker, learning to balance speed with quality along the way.'
      }
    ],
    [
      {
        type: 'text',
        content:
          'I completed my MS in Software Engineering at the '
      },
      { type: 'link', content: 'University of Texas at Arlington', href: 'https://www.uta.edu' },
      {
        type: 'text',
        content:
          ' in Spring 2026. These days, I\'m going deeper into backend systems, distributed architecture, and AI/LLM applications.'
      }
    ],
    [
      {
        type: 'text',
        content:
          'Outside of work, I enjoy playing football and video games.'
      }
    ]
  ];

  constructor(private scrollReveal: ScrollRevealService, private analytics: AnalyticsService) { }

  trackAboutLink(label: string): void {
    this.analytics.trackEvent('about_link_click', { label });
  }

  ngAfterViewInit() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      this.scrollReveal.reveal(this.aboutSection.nativeElement, srConfig());
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
