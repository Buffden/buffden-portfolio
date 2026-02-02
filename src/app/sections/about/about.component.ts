import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';
import { LinkedinBadgeComponent } from '../../shared/linkedin-badge/linkedin-badge.component';

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
          'My journey into software engineering started with automating a simple math problem and grew into building scalable, real-world systems. At '
      },
      { type: 'link', content: 'Clarivate Analytics', href: 'https://clarivate.com' },
      {
        type: 'text',
        content:
          ', I spent three years shipping production-grade features, owning CI/CD, and contributing to reliable architectures-learning to balance speed with rigor along the way.'
      }
    ],
    [
      {
        type: 'text',
        content:
          'I\'m currently pursuing an MS in Software Engineering at the '
      },
      { type: 'link', content: 'University of Texas at Arlington', href: 'https://www.uta.edu' },
      {
        type: 'text',
        content:
          ', focusing on system design and building clean, maintainable full-stack systems with Spring Boot and AWS. Outside work, I recharge with video games, football, and occasionally touch grass.'
      }
    ]
  ];

  constructor(private scrollReveal: ScrollRevealService) {}

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
