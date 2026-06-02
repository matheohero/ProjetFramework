import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtres',
  standalone: false,
  templateUrl: './filtres.component.html',
  styleUrl: './filtres.component.css'
})
export class FiltresComponent {

  constructor(private router: Router) {}

  ramMin: number = 32;
  romMin: number = 3840;
  prixMax: number = 5000;

  allerRecherche() {
    this.router.navigate(['/recherche']);
  }
}