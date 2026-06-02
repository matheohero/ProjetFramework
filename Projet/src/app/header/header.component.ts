import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<string>();

  query: string = '';

  menuOpen = false;

  constructor(public router: Router) {}

  ngOnInit(): void {

    // Mise à jour de la barre de recherche à chaque changement d'URL
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        const q = this.router.routerState.snapshot.root.queryParams['q'];

        this.query = q || '';
      });

    // Cas du premier chargement de la page (F5)
    const q = this.router.routerState.snapshot.root.queryParams['q'];
    this.query = q || '';
  }

  onSearch(): void {
    this.router.navigate(['/recherche'], {
      queryParams: {
        q: this.query.trim(),
        typePC: localStorage.getItem('typePC') ?? '',
        cpu: localStorage.getItem('cpu') ?? '',
        gpu: localStorage.getItem('gpu') ?? '',
        ramMin: +(localStorage.getItem('ramMin') ?? 32),
        romMin: +(localStorage.getItem('romMin') ?? 3840),
        prixMax: +(localStorage.getItem('prixMax') ?? 5000)
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen && this.router.url !== '/recherche') {

      this.router.navigate(['/recherche'], {
        queryParams: {
          typePC: localStorage.getItem('typePC') ?? '',
          cpu: localStorage.getItem('cpu') ?? '',
          gpu: localStorage.getItem('gpu') ?? '',
          ramMin: +(localStorage.getItem('ramMin') ?? 32),
          romMin: +(localStorage.getItem('romMin') ?? 3840),
          prixMax: +(localStorage.getItem('prixMax') ?? 5000)
        }
      });

    }
  }

  showFiltersButton(): boolean {
    return this.router.url !== '/questions';
  }
  showLogoutButton() {
    return this.router.url != "/historique";
  }
  logoutFunc() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

} 