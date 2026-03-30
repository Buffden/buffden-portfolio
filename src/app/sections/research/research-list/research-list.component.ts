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
  papers: Paper[] = papers;
  
  formatYear(year: number): string {
    return String(year).slice(-2);
  }
}
