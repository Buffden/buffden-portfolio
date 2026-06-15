import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(true);

  init(): void {
    const saved = localStorage.getItem('theme');
    const dark = saved !== 'light';
    this.isDark.set(dark);
    if (!dark) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  toggle(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    if (next) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }
}
