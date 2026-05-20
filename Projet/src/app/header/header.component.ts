import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  query: string = '';

  onSearch() {
    console.log('Recherche :', this.query);
  }

  menuOpen = false;

  toggleMenu(): void {
      this.menuOpen = !this.menuOpen;
  }

}