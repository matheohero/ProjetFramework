import { Component } from '@angular/core';
import { DataBaseService } from '../data-base.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recherche',
  standalone: false,
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})

export class RechercheComponent {

  db: DataBaseService = new DataBaseService();  
  lstNomPc: string[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const nom = params['q'];
      if (nom) {
        this.searchPC(nom);
      }
    });
  }

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
