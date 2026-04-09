import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ContactComponent } from './sections/contact/contact.component';
import { ResearchListComponent } from './sections/research/research-list/research-list.component';
import { MobileMenuComponent } from './layout/mobile-menu/mobile-menu.component';
import { SocialSidebarComponent } from './layout/social-sidebar/social-sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { EmailSidebarComponent } from './layout/email-sidebar/email-sidebar.component';
import { SkillsComponent } from './sections/skills/skills.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MobileMenuComponent,
    SocialSidebarComponent,
    EmailSidebarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    ResearchListComponent,
    FooterComponent,
    CommonModule,
    SkillsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'buffden-portfolio';
  headerAnimated = false;
  heroAnimated = false;
  sidebarAnimated = false;
  contentAnimated = false;
  emailSidebarAnimated = false;
  isHomeRoute = true;

  private routerSub!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    const hash = window.location.hash;
    this.isHomeRoute = !hash || hash === '#/' || hash === '#';

    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.isHomeRoute =
          e.urlAfterRedirects === '/' || e.urlAfterRedirects === '';
      });

    if (this.isHomeRoute) {
      setTimeout(() => {
        this.headerAnimated = true;

        setTimeout(() => {
          this.sidebarAnimated = true;
          this.emailSidebarAnimated = true;

          setTimeout(() => {
            this.heroAnimated = true;

            setTimeout(() => {
              this.contentAnimated = true;
            }, 500);
          }, 500);
        }, 500);
      }, 0);
    } else {
      this.headerAnimated = true;
      this.sidebarAnimated = true;
      this.emailSidebarAnimated = true;
    }
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
