import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerComponent } from '../../shared/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [NgFor, MatDialogModule],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  navItems = [
    { name: 'About', link: '#about' },
    { name: 'Experience', link: '#experience' },
    { name: 'Work', link: '#work' },
    { name: 'Contact', link: '#contact' }
  ];

  constructor(private dialog: MatDialog) {}

  onNavClick(event: Event, link: string) {
    event.preventDefault();
    document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
    this.closeMenu.emit();
  }

  openPdfViewer(): void {
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
    this.closeMenu.emit();
  }
}
