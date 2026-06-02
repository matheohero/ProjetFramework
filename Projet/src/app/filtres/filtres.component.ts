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

  typePC: string = '';
  cpu: string = '';
  gpu: string = '';

  ngOnInit(): void {
    this.typePC = localStorage.getItem('typePC') ?? '';
    this.cpu = localStorage.getItem('cpu') ?? '';
    this.gpu = localStorage.getItem('gpu') ?? '';

    this.ramMin = +(localStorage.getItem('ramMin') ?? 32);
    this.romMin = +(localStorage.getItem('romMin') ?? 3840);
    this.prixMax = +(localStorage.getItem('prixMax') ?? 5000);
  }

  // 🔥 UNE SEULE FONCTION POUR RAM / ROM / PRIX
  updateRangeFilter(field: 'ramMin' | 'romMin' | 'prixMax', value: number) {
    (this as any)[field] = value;
    localStorage.setItem(field, value.toString());
  }

  toggleFilter(field: 'typePC' | 'cpu' | 'gpu', value: string) {
    if ((this as any)[field] === value) {
      (this as any)[field] = '';
    } else {
      (this as any)[field] = value;
    }

    localStorage.setItem(field, (this as any)[field]);
  }

  allerRecherche() {
    this.router.navigate(['/recherche']);
  }
}