import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerComponent } from '../../shared/pdf-viewer/pdf-viewer.component';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [NgFor, MatDialogModule],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  navItems = [
    { name: 'About', link: '#about' },
    { name: 'Experience', link: '#experience' },
    { name: 'Work', link: '#work' },
    { name: 'Contact', link: '#contact' },
    { name: 'Research', link: '#research' },
    { name: 'Blog', link: '#blog' },
  ];

  constructor(private dialog: MatDialog, private router: Router, private analytics: AnalyticsService) {}

  onNavClick(event: Event, link: string) {
    event.preventDefault();
    this.analytics.trackEvent('nav_click', { section: link.replace('#', ''), source: 'mobile_menu' });
    const target = document.querySelector(link);
    if (target) {
      // Section exists on current page, scroll to it
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Section not on current page (e.g. on detail route), navigate home
      this.router.navigate(['/']);
    }
    this.closeMenu.emit();
  }

  openPdfViewer(): void {
    this.analytics.trackEvent('resume_view', { source: 'mobile_menu' });
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
    this.closeMenu.emit();
  }
}
