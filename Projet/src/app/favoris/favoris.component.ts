import { Component } from '@angular/core';
import { DataBaseService, Profil } from '../data-base.service';

@Component({
  selector: 'app-favoris',
  standalone: false,
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.css'
})
export class FavorisComponent {
  favoris: any[] = [];
    user?: Profil;

    constructor(private db: DataBaseService) {}

    ngOnInit(): void {

      const username = localStorage.getItem('currentUser');

      if (!username) return;

      this.user = this.db.getUser(username);

      if (this.user) {
        this.favoris = this.user.favory || [];
      }
    }

    removeFavori(index: number) {

      this.favoris.splice(index, 1);

      if (this.user) {
        this.user.favory = this.favoris;
        localStorage.setItem('users', JSON.stringify(this.db.lstUser));
      }
    }
}
