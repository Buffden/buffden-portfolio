import { AfterViewInit, Component, effect, ElementRef, Inject, NgZone, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from '../theme.service';

declare global {
  interface Window {
    LI?: { parse: () => void }
  }
}

@Component({
  selector: 'app-linkedin-badge',
  standalone: true,
  template: `<div #badgeWrapper></div>`
})
export class LinkedinBadgeComponent implements AfterViewInit {
  @ViewChild('badgeWrapper') badgeWrapper!: ElementRef<HTMLDivElement>;
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private zone: NgZone,
    public themeService: ThemeService
  ) {
    effect(() => {
      const theme = themeService.isDark() ? 'dark' : 'light';
      if (this.isBrowser) {
        this.zone.runOutsideAngular(() => setTimeout(() => this.renderBadge(theme), 0));
      }
    });
  }

  private renderBadge(theme: string) {
    const wrapper = this.badgeWrapper.nativeElement;

    // Reset badge markup with correct theme
    wrapper.innerHTML = `
      <div
        class="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme="${theme}"
        data-type="VERTICAL"
        data-vanity="harshwardhanpatil23"
        data-version="v1"
      >
        <a class="badge-base__link LI-simple-link"
           href="https://www.linkedin.com/in/harshwardhanpatil23?trk=profile-badge">
        </a>
      </div>`;

    // Remove old script and LI global so the script re-initialises from scratch
    const id = 'linkedin-badge-js';
    document.getElementById(id)?.remove();
    delete window.LI;

    const s = document.createElement('script');
    s.id = id;
    s.src = 'https://platform.linkedin.com/badges/js/profile.js';
    s.async = true;
    s.defer = true;
    document.body.appendChild(s);
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isBrowser = true;

    const theme = this.themeService.isDark() ? 'dark' : 'light';
    this.zone.runOutsideAngular(() => setTimeout(() => this.renderBadge(theme), 0));

    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const t = this.themeService.isDark() ? 'dark' : 'light';
        setTimeout(() => this.renderBadge(t), 0);
      });
  }
}
