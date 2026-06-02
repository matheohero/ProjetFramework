import { Component, Input, OnInit } from '@angular/core';
import { DataBaseService, Filtre } from '../data-base.service';

@Component({
  selector: 'app-produit',
  standalone: false,
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit{


  ngOnInit(): void {
    this.prix = this.db.searchPc({
      prixMax: -1,
      type: '',
      ramMin: -1,
      hddCapaMin: -1,
      nomPc: this.nom,
      marqueCPU: '',
      marqueGPU: ''
    })[0].prix;
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
