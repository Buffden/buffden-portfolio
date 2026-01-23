import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ContactComponent } from './sections/contact/contact.component';
import { MobileMenuComponent } from './layout/mobile-menu/mobile-menu.component';
import { SocialSidebarComponent } from './layout/social-sidebar/social-sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';
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
    FooterComponent,
    LoaderComponent,
    CommonModule,
    SkillsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'buffden-portfolio';
  isLoading = true;
  headerAnimated = false;
  heroAnimated = false;
  sidebarAnimated = false;
  contentAnimated = false;
  emailSidebarAnimated = false;

  ngOnInit() {
    // 0ms: Initial page load - loader appears
    // 2000ms: Loader fades out and disappears
    setTimeout(() => {
      this.isLoading = false;
      
      // 2400ms: Header fades in and animates
      setTimeout(() => {
        this.headerAnimated = true;
        
        // 3200ms: Social sidebar slides in from left
        setTimeout(() => {
          this.sidebarAnimated = true;
          this.emailSidebarAnimated = true;
          // 4200ms: Hero section fades in and animates
          setTimeout(() => {
            this.heroAnimated = true;
            
            // 4700ms: Main content sections fade in from bottom
            setTimeout(() => {
              this.contentAnimated = true;
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 2000);
  }
}
