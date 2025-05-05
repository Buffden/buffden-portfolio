import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef;

  constructor(private scrollReveal: ScrollRevealService) {}

  ngAfterViewInit() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      this.scrollReveal.reveal(this.contactSection.nativeElement, srConfig());
    }
  }
}
