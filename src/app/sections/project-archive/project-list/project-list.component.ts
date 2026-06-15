import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  npmDownloads: Record<string, number> = {};

  constructor(private router: Router, private http: HttpClient) {
    this.projects
      .filter(p => p.npmPackage)
      .forEach(p => {
        this.http.get<{ downloads: number }>(`https://api.npmjs.org/downloads/point/2020-01-01:2099-12-31/${p.npmPackage}`)
          .subscribe({ next: res => { this.npmDownloads[p.npmPackage!] = res.downloads; } });
      });
  }

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
