import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Blog, blogs } from '../../../data/constants/blogs';

@Component({
  selector: 'app-blog-archive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-archive.component.html',
  styleUrl: './blog-archive.component.scss',
})
export class BlogArchiveComponent implements OnInit {
  blogs: Blog[] = blogs;

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  backToPortfolio(): void {
    this.router.navigate(['/']).then(() => {
      requestAnimationFrame(() => {
        document.getElementById('blog')?.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    });
  }
}
