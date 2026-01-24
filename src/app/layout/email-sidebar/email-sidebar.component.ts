import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="email-sidebar">
      <a href="mailto:work.harshwardhanpatil&#64;gmail.com" class="email-link">
        work.harshwardhanpatil&#64;gmail.com
      </a>
      <div class="line"></div>
    </div>
  `,
  styleUrls: ['./email-sidebar.component.scss']
})
export class EmailSidebarComponent {
  @Input() animatedIn = false;
  @HostBinding('class.animated-in') get animatedInClass() {
    return this.animatedIn;
  }
} 