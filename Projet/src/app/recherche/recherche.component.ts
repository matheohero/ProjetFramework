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
  lstNomPc = ["Respire TC10","Respire TC2"];

  searchPC(nom:string) {
    console.log("nom -->"+nom);
    let lstPc = this.db.searchPc({
      prixMax: 0,
      type: '',
      ramMin: 0,
      hddCapaMin: 0,
      nomPc: ''
    });

    console.log(lstPc);
  }
}
