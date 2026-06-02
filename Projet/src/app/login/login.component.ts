import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataBaseService } from '../data-base.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
username: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor( private db: DataBaseService, private router: Router) {}

  login() {

    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    if (!this.db.isPwdCorrect(this.username, this.password)) {
      this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect.';
      return;
    }

    localStorage.setItem('currentUser', this.username);

    this.router.navigate(['/']);
  }
}
