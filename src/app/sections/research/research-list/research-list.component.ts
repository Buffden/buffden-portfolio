import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Paper, papers } from '../../../data/constants/papers';

@Component({
  selector: 'app-research-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './research-list.component.html',
  styleUrl: './research-list.component.scss',
})
export class ResearchListComponent {
  private allPapers: Paper[] = papers;
  readonly pageSize = 3;
  currentPage = 0;

  get papers(): Paper[] {
    const start = this.currentPage * this.pageSize;
    return this.allPapers.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.allPapers.length / this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 0) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) this.currentPage++;
  }

  formatYear(year: number): string {
    return String(year).slice(-2);
  }
}
