import { Injectable } from '@angular/core';

declare const gtag: (...args: unknown[]) => void;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  trackEvent(eventName: string, params: Record<string, string> = {}): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    }
  }
}
