import { Routes } from '@angular/router';
import { ResearchDetailComponent } from './sections/research/research-detail/research-detail.component';

export const routes: Routes = [
  {
    path: 'research/:slug',
    component: ResearchDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
