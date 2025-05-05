import { Injectable } from '@angular/core';
import ScrollReveal from 'scrollreveal';

@Injectable({
  providedIn: 'root',
})
export class ScrollRevealService {
  private sr: any;

  constructor() {
    if (typeof window !== 'undefined') {
      this.sr = ScrollReveal();
    }
  }

  reveal(selector: string | Element, config: any = {}) {
    if (this.sr) {
      this.sr.reveal(selector, config);
    }
  }
} 