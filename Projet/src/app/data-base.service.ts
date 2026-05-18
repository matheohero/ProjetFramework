import pc from "../../data/pcs.json";

import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  lstPc:any;
  lstUser: Array<Profil> = [];


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



  getUser(user:string) {
    for (let i = 0; i < this.lstUser.length; i++) {
      if (this.lstUser[i].nomUser == user) {
        return this.lstUser[i];
      }
    }
    return undefined;
  }

  isPwdCorrect(username:string , pwd:string) {
    let user:Profil|undefined;
    user = this.getUser(username);
    if (user == undefined) return false;
    return (user.mdp == pwd);
  }


}


export interface Filtre {
  prixMax : number,
  type : string,
  ramMin : number,
  hddCapaMin : number,
}

export interface Profil {
  nomUser : string,
  mdp : string,
  historique : any,
  favory : any
}