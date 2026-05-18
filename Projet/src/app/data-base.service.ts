import pc from "../../data/pcs.json";

import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  lstPc:any;


  constructor() { 
    this.lstPc = pc;
  }

  getAllpc() {
    return this.lstPc;
  }

  searchPc(filtres : Filtre) {
    let lstPcFiltree = this.lstPc;

    if (filtres.prixMax != -1) {
      lstPcFiltree = lstPcFiltree.filter((pc: { prix: number; }) => filtres.prixMax >= pc.prix);
    }
    if (filtres.hddCapaMin != -1) {
      lstPcFiltree = lstPcFiltree.filter((pc: { [x: string]: { [x: string]: { capacite: number; }; }; } ) => 
        filtres.hddCapaMin <= pc["system"]["hdd"].capacite);
    }
    if (filtres.ramMin != -1) {
      lstPcFiltree = lstPcFiltree.filter((pc: { [x: string]: { ram: number; }; } ) => filtres.ramMin <= pc["system"].ram);
    }
    if (filtres.type != "") {
      lstPcFiltree = lstPcFiltree.filter((pc: { type: string; }) => filtres.type == pc.type);
    }

    return lstPcFiltree;
  }
}


export interface Filtre {
  prixMax : number,
  type : string,
  ramMin : number,
  hddCapaMin : number,
}