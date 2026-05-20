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
  lstNomPc: string[] = [];

  searchPC(nom:string) {
    console.log("nom -->"+nom);
    let lstPc = this.db.searchPc({
      prixMax: -1,
      type: '',
      ramMin: -1,
      hddCapaMin: -1,
      nomPc: nom
    });

    for (let index = 0; index < lstPc.length; index++) {
      this.lstNomPc.push(lstPc[index].nom);
    }

    
  }
}
