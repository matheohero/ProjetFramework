import { Component } from '@angular/core';
import { DataBaseService } from '../data-base.service';

@Component({
  selector: 'app-recherche',
  standalone: false,
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent {

  db: DataBaseService = new DataBaseService();  

  recherche: string = "";

  searchPC(nom:string) {
    console.log("nom -->"+nom);
  }
}
