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

    lstPcFiltree = lstPcFiltree.filter((pc: { prix: Number; }) => filtres.prixMax >= pc.prix);

    return lstPcFiltree;
  }
}


export interface Filtre {
  prixMin : Number,
  prixMax : Number,
  type : string,
  ramMin : Number,
  ramMax : Number,
  hddCapaMin : Number,
  hddCapaMax : Number
}