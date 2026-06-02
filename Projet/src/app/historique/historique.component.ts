import { Component } from '@angular/core';
import { DataBaseService, Profil } from '../data-base.service';

@Component({
  selector: 'app-historique',
  standalone: false,
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {
 historique: any[] = [];
  user?: Profil;

  constructor(private db: DataBaseService) {}

  ngOnInit(): void {

    const username = localStorage.getItem('currentUser');

    if (!username) return;

    this.user = this.db.getUser(username);

    if (this.user) {
      this.historique = this.user.historique || [];
    }
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
