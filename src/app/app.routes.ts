import { Routes } from '@angular/router';
import { ResearchDetailComponent } from './sections/research/research-detail/research-detail.component';
import { ProjectListComponent } from './sections/project-archive/project-list/project-list.component';

export const routes: Routes = [
  {
    path: 'research/:slug',
    component: ResearchDetailComponent,
  },
  {
    path: 'project/archive',
    component: ProjectListComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
