import { Component, HostBinding, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerComponent } from '../../shared/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() animatedIn = false;
  @HostBinding('class.animated-in') get animatedInClass() {
    return this.animatedIn;
  }

  public activeSection: string = '';
  public isResearchRoute = false;
  private observer!: IntersectionObserver;
  private sectionIds = ['about', 'skills', 'experience', 'projects', 'contact', 'research'];
  private routerSub!: Subscription;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.isResearchRoute = this.router.url.startsWith('/research');

    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.isResearchRoute = e.urlAfterRedirects.startsWith('/research');
        // Re-attach observer after navigating back home so #research is found
        if (!this.isResearchRoute) {
          setTimeout(() => this.setupIntersectionObserver(), 50);
        }
      });
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.routerSub?.unsubscribe();
  }

  openPdfViewer(): void {
    this.dialog.open(PdfViewerComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px',
      maxHeight: '90vh',
      data: {
        pdfUrl: 'https://buffden.github.io/resume/Harshwardhan-Patil-Resume.pdf',
        fileName: 'resume.pdf',
      },
    });
  }

  private setupIntersectionObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }

    const options = {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    this.sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        this.observer.observe(section);
      }
    });
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    (event.target as HTMLElement).blur();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // On a routed page (e.g. detail view) — navigate home then scroll
      this.router.navigate(['/']).then(() => {
        requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }
  }

}
