import { Component, Output  , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() searchEvent = new EventEmitter<string>();
  
  query: string = '';

  onSearch() {
    console.log('Recherche :', this.query);
    this.searchEvent.emit(this.query);
  }

  menuOpen = false;

  toggleMenu(): void {
      this.menuOpen = !this.menuOpen;
  }

}