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
      prixMax: -1, //800
      type: '', //portable
      ramMin: -1, //8
      hddCapaMin: -1,
      nomPc: "",
      marqueCPU: '',
      marqueGPU: 'INTEL'
    };
    //console.log(this.db.getAllpc());
    console.log(this.db.searchPc(filters));

    //this.db.createUser("test","1234")
    //console.log(this.db.getUser("test"));
    //console.log(this.db.getUser("test4"));
  }
}
