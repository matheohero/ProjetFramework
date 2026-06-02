import { Component, Input, OnInit } from '@angular/core';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produit',
  standalone: false,
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.prix = this.db.searchPcByName(this.nom).prix;
  }

  db: DataBaseService = new DataBaseService();

  @Input()
  nom:string = "";

  @Input()
  showFavButton:boolean = false;

  prix:number = -1;

  addToFavorite() {
    let user = localStorage.getItem('currentUser');
    if (user == null) {
      alert("Il faut etre connecter pour pouvoir mettre en favoris");
      return;
    }
    this.db.addFavorite(user,this.nom);
  }
  
}
