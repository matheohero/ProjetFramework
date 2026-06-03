import { Component } from '@angular/core';
import { DataBaseService, Filtre, Profil } from '../data-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historique',
  standalone: false,
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {
  historique: any[] = [];
  user?: Profil;

  constructor(private db: DataBaseService ,  private router: Router) {}

  ngOnInit(): void {

    const username = localStorage.getItem('currentUser');

    if (!username) return;

    this.user = this.db.getUser(username);

    if (this.user) {
      this.historique = this.user.historique || [];
    }
  }

  relancerRecherche(item: Filtre): void {
    this.router.navigate(['/recherche'], {
      queryParams: {
        q:       item.nomPc      || undefined,
        typePC:  item.type       || undefined,
        cpu:     item.marqueCPU  || undefined,
        gpu:     item.marqueGPU  || undefined,
        ramMin:  item.ramMin    !== -1 ? item.ramMin    : undefined,
        romMin:  item.hddCapaMin !== -1 ? item.hddCapaMin : undefined,
        prixMax: item.prixMax   !== -1 ? item.prixMax   : undefined,
      }
    });
  }


  clearHistorique() {

    this.historique = [];

    if (this.user) {
      this.user.historique = [];
      localStorage.setItem('users', JSON.stringify(this.db.lstUser));
    }
  }

  removeItem(index: number) {

    this.historique.splice(index, 1);

    if (this.user) {
      this.user.historique = this.historique;
      localStorage.setItem('users', JSON.stringify(this.db.lstUser));
    }
  }
}
