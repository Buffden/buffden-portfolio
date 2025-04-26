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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MobileMenuComponent,
    SocialSidebarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'buffden-portfolio';
}
