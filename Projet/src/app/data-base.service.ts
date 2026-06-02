import pc from "../../data/pcs.json";

import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  private LOCAL_STORAGE = "users";
  private HOSTO_SAVE_COUNT = 10;

  lstPc:any;
  lstUser:Array<Profil> = [];
  Histo:Array<Filtre> = [];

  constructor() { 
    this.lstPc = pc;
  }


  getAllpc() {
    return this.lstPc;
  }

  searchPc(filtres : Filtre) {
    let lstPcFiltree = this.lstPc;

    if (filtres.nomPc != "") {
      lstPcFiltree = lstPcFiltree.filter((pc: { nom: string; }) => pc.nom.includes(filtres.nomPc));
    }
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
    if (filtres.marqueCPU != "") {
      lstPcFiltree = lstPcFiltree.filter((pc: { [x: string]: { [x: string]: { marque: string; }; }; } ) => 
        filtres.marqueCPU == pc["system"]["cpu"].marque);
    }
    if (filtres.marqueGPU != "") {
      lstPcFiltree = lstPcFiltree.filter((pc: { [x: string]: { [x: string]: { marque: string; }; }; } ) => 
        filtres.marqueGPU == pc["system"]["cg"].marque);
    }

    return lstPcFiltree;
  }

  searchPcByName(pcName : string) {
      return this.lstPc.filter((pc: { nom: string; }) => pc.nom == pcName)[0];
  }
  

  getAllUser() {
    const users = localStorage.getItem(this.LOCAL_STORAGE);
    if (users != null) {
      this.lstUser = JSON.parse(users);
    }
  }


  getUser(user:string) {
    this.getAllUser();
    for (let i = 0; i < this.lstUser.length; i++) {
      if (this.lstUser[i].nomUser == user) {
        return this.lstUser[i];
      }
    }
    return undefined;
  }

  isPwdCorrect(username: string, pwd: string): boolean {
    let user = this.getUser(username);
    if (!user) {
      return false;
    }
    return user.mdp === pwd;
  }


  createUser(username:string , pwd:string) {
    this.getAllUser();
    let user: Profil = {
      nomUser: username,
      mdp: pwd,
      historique: [],
      favory: []
    };

    this.lstUser.push(user);

    localStorage.setItem(this.LOCAL_STORAGE, JSON.stringify(this.lstUser));
  }


  addFavorite(username:string , pc:string) {
    let user = this.getUser(username);
    if (user == undefined) return;

    if (!user.favory.includes(pc)) { 
      user.favory.push(pc);
    }

    localStorage.setItem(this.LOCAL_STORAGE, JSON.stringify(this.lstUser));
  }

  addToHisto(filtre:Filtre) {

  }

}

export interface Filtre {
  prixMax : number,
  type : string,
  ramMin : number,
  hddCapaMin : number,
  nomPc : string,
  marqueCPU : string,
  marqueGPU : string
}

export interface Profil {
  nomUser : string,
  mdp : string,
  historique : any,
  favory : any
}