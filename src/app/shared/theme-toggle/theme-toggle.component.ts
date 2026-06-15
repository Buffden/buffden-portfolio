import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) { }

  toggle(): void {
    this.themeService.toggle();
  }
}
