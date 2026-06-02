import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="social-sidebar">
      <ul class="social-list">
        <li>
          <a href="https://github.com/buffden" aria-label="GitHub" target="_blank" rel="noreferrer" class="favicon-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968896.png" alt="GitHub" width="25" height="25" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/harshwardhanpatil23" aria-label="LinkedIn" target="_blank" rel="noreferrer" class="favicon-icon">
            <img src="https://www.google.com/s2/favicons?domain=linkedin.com&sz=32" alt="LinkedIn" width="20" height="20" />
          </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/~buffden" aria-label="npm" target="_blank" rel="noreferrer" class="favicon-icon">
            <img src="https://www.google.com/s2/favicons?domain=npmjs.com&sz=32" alt="npm" width="20" height="20" />
          </a>
        </li>
        <li>
          <a href="https://medium.com/@buffden" aria-label="Medium" target="_blank" rel="noreferrer" class="favicon-icon">
            <img src="https://www.google.com/s2/favicons?domain=medium.com&sz=32" alt="Medium" width="20" height="20" />
          </a>
        </li>
        <li>
          <a href="https://leetcode.com/buffden" aria-label="LeetCode" target="_blank" rel="noreferrer" class="favicon-icon">
            <img src="https://www.google.com/s2/favicons?domain=leetcode.com&sz=32" alt="LeetCode" width="20" height="20" />
          </a>
        </li>
        <li>
          <a href="https://huggingface.co/buffden" aria-label="Hugging Face" target="_blank" rel="noreferrer" class="favicon-icon">
            <img src="https://www.google.com/s2/favicons?domain=huggingface.co&sz=32" alt="Hugging Face" width="20" height="20" />
          </a>
        </li>
      </ul>
      <div class="line"></div>
    </div>
  `,
  styleUrls: ['./social-sidebar.component.scss']
})
export class SocialSidebarComponent {
  @Input() animatedIn = false;
  @HostBinding('class.animated-in') get animatedInClass() {
    return this.animatedIn;
  }
}