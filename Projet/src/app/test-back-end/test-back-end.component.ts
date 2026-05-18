import { Component } from '@angular/core';
import { DataBaseService, Filtre } from '../data-base.service';

@Component({
  selector: 'app-test-back-end',
  standalone: false,
  templateUrl: './test-back-end.component.html',
  styleUrl: './test-back-end.component.css'
})
export class TestBackEndComponent {

  db: DataBaseService = new DataBaseService();

  test() {
    let filters: Filtre = {
      prixMin: -1,
      prixMax: 500,
      type: 'portable',
      ramMin: -1,
      ramMax: -1,
      hddCapaMin: -1,
      hddCapaMax: -1
    };


    //console.log(this.db.getAllpc());
    console.log(this.db.searchPc(filters));
  }
}
