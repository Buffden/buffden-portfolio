import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private analytics: AnalyticsService) {}

  trackFooterSource(): void {
    this.analytics.trackEvent('footer_source_click');
  }
}
