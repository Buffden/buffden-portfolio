import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MiniProject, miniProjects } from '../../../data/constants/projects-archive';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
  projects: MiniProject[] = miniProjects;

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  backToProjects(): void {
    this.router.navigate(['/']).then(() => {
      requestAnimationFrame(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    });
  }
}
