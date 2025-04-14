import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [NgFor],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  navItems = [
    { name: 'About', link: '#about' },
    { name: 'Experience', link: '#experience' },
    { name: 'Work', link: '#work' },
    { name: 'Contact', link: '#contact' }
  ];

  onNavClick(event: Event, link: string) {
    event.preventDefault();
    document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
    this.closeMenu.emit();
  }
}
