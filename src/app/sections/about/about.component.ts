import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';
import { LinkedinBadgeComponent } from '../../shared/linkedin-badge/linkedin-badge.component';

@Component({
  selector: 'app-about',
  imports: [LinkedinBadgeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef;

  constructor(private scrollReveal: ScrollRevealService) {}

  ngAfterViewInit() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      this.scrollReveal.reveal(this.aboutSection.nativeElement, srConfig());
    }
  }
}
