import { Component, HostBinding, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerComponent } from '../../shared/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() animatedIn = false;
  @HostBinding('class.animated-in') get animatedInClass() {
    return this.animatedIn;
  }

  animationStarted = false;
  showScrollIndicator = true;
  private heroElement: HTMLElement | null = null;
  private scrollListener: (() => void) | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    setTimeout(() => {
      this.animationStarted = true;
    }, 100);

    // Get hero element and set up scroll listener
    this.heroElement = document.querySelector('app-hero');
    if (this.heroElement) {
      this.scrollListener = () => this.updateScrollIndicatorVisibility();
      window.addEventListener('scroll', this.scrollListener);
      this.updateScrollIndicatorVisibility();
    }
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private updateScrollIndicatorVisibility(): void {
    if (!this.heroElement) return;

    const heroRect = this.heroElement.getBoundingClientRect();
    // Show indicator only if hero section is visible in viewport
    this.showScrollIndicator = heroRect.bottom > 0;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  openPdfViewer(): void {
    if (window.innerWidth <= 700) {
      window.open('https://buffden.github.io/resume/Harshwardhan-Patil-Resume.pdf', '_blank');
    } else {
      this.dialog.open(PdfViewerComponent, {
        width: '90vw',
        height: '90vh',
        maxWidth: '1200px',
        maxHeight: '90vh',
        data: {
          pdfUrl: 'https://buffden.github.io/resume/Harshwardhan-Patil-Resume.pdf',
          fileName: 'resume.pdf'
        }
      });
    }
  }
}
