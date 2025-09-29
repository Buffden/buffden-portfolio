import { AfterViewInit, Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global { 
  interface Window { 
    LI?: { parse: () => void } 
  } 
}

@Component({
  selector: 'app-linkedin-badge',
  standalone: true,
  template: `
    <div
      class="badge-base LI-profile-badge"
      data-locale="en_US"
      data-size="medium"
      data-theme="dark"
      data-type="VERTICAL"
      data-vanity="harshwardhanpatil23"
      data-version="v1"
    >
      <a class="badge-base__link LI-simple-link"
         href="https://www.linkedin.com/in/harshwardhanpatil23?trk=profile-badge">
      </a>
    </div>
  `
})
export class LinkedinBadgeComponent implements AfterViewInit {
  private ensureScriptLoaded() {
    const id = 'linkedin-badge-js';
    if (document.getElementById(id)) return;
    const s = document.createElement('script');
    s.id = id;
    s.src = 'https://platform.linkedin.com/badges/js/profile.js';
    s.async = true;
    s.defer = true;
    document.body.appendChild(s);
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private zone: NgZone
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ensureScriptLoaded();

    // Parse once the component is in the DOM
    this.zone.runOutsideAngular(() =>
      setTimeout(() => window.LI?.parse(), 0)
    );

    // Re-parse on client-side route changes (SPA)
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => window.LI?.parse(), 0));
  }
}
