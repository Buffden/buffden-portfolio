import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { marked } from 'marked';
import { Paper, papers } from '../../../data/constants/papers';
import { SafeUrlPipe } from '../../../shared/safe-url.pipe';

@Component({
  selector: 'app-research-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeUrlPipe],
  templateUrl: './research-detail.component.html',
  styleUrl: './research-detail.component.scss',
})
export class ResearchDetailComponent implements OnInit, OnDestroy {
  paper: Paper | null = null;
  prevPaper: Paper | null = null;
  nextPaper: Paper | null = null;
  reviewHtml: SafeHtml | null = null;
  notFound = false;
  showPdfPreview = false;

  private paramSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.subscribe((params) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const slug = params.get('slug');
      const index = papers.findIndex((p) => p.slug === slug);

      if (index === -1) {
        this.notFound = true;
        this.paper = null;
        return;
      }

      this.notFound = false;
      this.showPdfPreview = false;
      this.reviewHtml = null;
      this.paper = papers[index];
      this.prevPaper = index > 0 ? papers[index - 1] : null;
      this.nextPaper = index < papers.length - 1 ? papers[index + 1] : null;

      if (this.paper.reviewPath) {
        this.http.get(this.paper.reviewPath, { responseType: 'text' }).subscribe({
          next: (md) => {
            const html = marked.parse(md) as string;
            this.reviewHtml = this.sanitizer.bypassSecurityTrustHtml(html);
          },
          error: () => {
            this.reviewHtml = null;
          },
        });
      }
    });
  }

  backToButtonClick() {
    this.router.navigate(['/']).then(() => {
      requestAnimationFrame(() => {
        document.getElementById('research')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }
}
