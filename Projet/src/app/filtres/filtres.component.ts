import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PcProfile } from '../questions/questions.component';
import { DataBaseService } from '../data-base.service';

@Component({
  selector: 'app-filtres',
  standalone: false,
  templateUrl: './filtres.component.html',
  styleUrl: './filtres.component.css'
})
export class FiltresComponent {
  constructor(private router: Router) {}
  ramMin: number = 0;
  romMin: number = 0;
  prixMax: number = 2000;
  typePC: string = '';
  cpu: string = '';
  gpu: string = '';

  ngOnInit(): void {
    const profileDejaApplique = localStorage.getItem('pcProfileApplied');

    if (!profileDejaApplique) {
      // Premier chargement après le QCM : on utilise pcProfile
      const raw = localStorage.getItem('pcProfile');
      const profile: PcProfile | null = raw ? JSON.parse(raw) : null;
      this.typePC  = profile?.type   ?? '';
      this.cpu     = '';
      this.gpu     = '';
      this.ramMin  = profile?.ram    ?? 0;
      this.romMin  = profile?.rom    ?? 0;
      this.prixMax = profile?.budget ?? 2000;
    } else {
      // Chargements suivants : on utilise les valeurs sauvegardées manuellement
      this.typePC  = localStorage.getItem('typePC')  ?? '';
      this.cpu     = localStorage.getItem('cpu')     ?? '';
      this.gpu     = localStorage.getItem('gpu')     ?? '';
      this.ramMin  = +(localStorage.getItem('ramMin')  ?? 0);
      this.romMin  = +(localStorage.getItem('romMin')  ?? 0);
      this.prixMax = +(localStorage.getItem('prixMax') ?? 2000);
    }
  }

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
    localStorage.setItem('pcProfileApplied', 'true');

    this.router.navigate(['/recherche'], {
      queryParams: {
        q: '',
        typePC: this.typePC,
        cpu: this.cpu,
        gpu: this.gpu,
        ramMin: this.ramMin,
        romMin: this.romMin,
        prixMax: this.prixMax
      }
    });
  }

  appliquerFiltres() {
    localStorage.setItem('pcProfileApplied', 'true');
    this.router.navigate(['/recherche'], {
      queryParams: {
        typePC: this.typePC,
        cpu: this.cpu,
        gpu: this.gpu,
        ramMin: this.ramMin,
        romMin: this.romMin,
        prixMax: this.prixMax
      }
    });
  }
}