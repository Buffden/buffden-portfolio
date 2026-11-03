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
          'I\'m a Software Engineer at '
      },
      { type: 'link', content: 'Varsity Brands', href: 'https://www.varsitybrands.com' },
      {
        type: 'text',
        content:
          ', shaping design and architecture decisions for backend services with a focus on reliability and clean code.'
      }
    ],
    [
      {
        type: 'text',
        content:
          'Before that, I spent 3 years at '
      },
      { type: 'link', content: 'Clarivate Analytics', href: 'https://clarivate.com' },
      {
        type: 'text',
        content:
          ' building full-stack, data-heavy applications with Java, Spring Boot, Angular, and AWS, and earned my MS in Software Engineering from the '
      },
      { type: 'link', content: 'University of Texas at Arlington', href: 'https://www.uta.edu' },
      {
        type: 'text',
        content:
          '.'
      }
    ],
    [
      {
        type: 'text',
        content:
          'My journey started with automating a simple math problem. These days, outside of work, I explore distributed systems and AI/LLM applications, and enjoy football and video games.'
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
