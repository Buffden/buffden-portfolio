import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Paper, papers } from '../../../data/constants/papers';

@Component({
  selector: 'app-research-archive',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './research-archive.component.html',
  styleUrl: './research-archive.component.scss',
})
export class ResearchArchiveComponent implements OnInit {
  papers: Paper[] = papers;

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  backToPortfolio(): void {
    this.router.navigate(['/']).then(() => {
      requestAnimationFrame(() => {
        document.getElementById('research')?.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    });
  }
}
