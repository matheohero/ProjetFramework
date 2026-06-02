import { Component } from '@angular/core';
import { DataBaseService } from '../data-base.service';

@Component({
  selector: 'app-creer-compte',
  standalone: false,
  templateUrl: './creer-compte.component.html',
  styleUrl: './creer-compte.component.css'
})
export class CreerCompteComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private db: DataBaseService) {}

  register() {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (this.db.getUser(this.username)) {
      this.errorMessage = 'Ce nom d\'utilisateur existe déjà.';
      return;
    }

    this.db.createUser(this.username, this.password);

    this.successMessage = 'Compte créé avec succès !';

    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    
  }
}
