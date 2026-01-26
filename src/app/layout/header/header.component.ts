import { Component, HostBinding, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerComponent } from '../../shared/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() animatedIn = false;
  @HostBinding('class.animated-in') get animatedInClass() {
    return this.animatedIn;
  }

  public activeSection: string = '';
  private observer!: IntersectionObserver;
  private sectionIds = ['about', 'skills', 'experience', 'projects', 'contact'];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  openPdfViewer(): void {
    if (window.innerWidth <= 700) {
      window.open('https://buffden.github.io/resume/full-stack-resume.pdf', '_blank');
    } else {
      this.dialog.open(PdfViewerComponent, {
        width: '90vw',
        height: '90vh',
        maxWidth: '1200px',
        maxHeight: '90vh',
        data: {
          pdfUrl: 'https://buffden.github.io/resume/full-stack-resume.pdf',
          fileName: 'resume.pdf'
        }
      });
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -60% 0px', // Adjusts when the section is considered 'active'
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    this.sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        this.observer.observe(section);
      }
    });
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
