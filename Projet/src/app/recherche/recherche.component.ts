import { Component } from '@angular/core';
import { DataBaseService, Filtre } from '../data-base.service';
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
  aucunResultat: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      const nom = params['q'] ?? '';

      const typePC = params['typePC'] ?? '';
      const cpu = params['cpu'] ?? '';
      const gpu = params['gpu'] ?? '';

      const ramMin = +(params['ramMin'] ?? -1);
      const romMin = +(params['romMin'] ?? -1);
      const prixMax = +(params['prixMax'] ?? -1);

      this.searchPC(nom, typePC, cpu, gpu, ramMin, romMin, prixMax);
    });
  }

  searchPC(
    nom: string,
    typePC: string,
    cpu: string,
    gpu: string,
    ramMin: number,
    romMin: number,
    prixMax: number
  ) {
    console.log(
      nom,
      typePC,
      cpu,
      gpu,
      ramMin,
      romMin,
      prixMax
    );
    let filter:Filtre = {
      prixMax: prixMax,
      type: typePC,
      ramMin: ramMin,
      hddCapaMin: romMin,
      nomPc: nom,
      marqueCPU: cpu,
      marqueGPU: gpu
    };

    let lstPc = this.db.searchPc(filter);

    this.db.addToHisto(filter, lstPc.length);

    this.lstNomPc = [];

    for (let index = 0; index < lstPc.length; index++) {
      this.lstNomPc.push(lstPc[index].nom);
    }

    this.aucunResultat = this.lstNomPc.length === 0;

  }
}
