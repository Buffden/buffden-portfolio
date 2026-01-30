import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss'
})
export class PdfViewerComponent {
  pdfUrl: string;
  safePdfUrl: SafeResourceUrl;
  fileName: string;

  constructor(
    public dialogRef: MatDialogRef<PdfViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.pdfUrl = data?.pdfUrl || 'https://buffden.github.io/resume/Harshwardhan-Patil-Resume.pdf';
    this.fileName = data?.fileName || 'resume.pdf';
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDownload(): void {
    const link = document.createElement('a');
    link.href = this.pdfUrl;
    link.download = this.fileName;
    link.click();
  }
}
