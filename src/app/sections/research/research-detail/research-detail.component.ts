import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  reviewParagraphs: string[] = [];
  notFound = false;
  showPdfPreview = false;

  private paramSub!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

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
      this.paper = papers[index];
      this.prevPaper = index > 0 ? papers[index - 1] : null;
      this.nextPaper = index < papers.length - 1 ? papers[index + 1] : null;

      this.reviewParagraphs = this.paper.review
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
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
