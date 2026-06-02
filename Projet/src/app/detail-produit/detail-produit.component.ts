import { Component } from '@angular/core';
import { DataBaseService } from '../data-base.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-produit',
  standalone: false,
  templateUrl: './detail-produit.component.html',
  styleUrl: './detail-produit.component.css'
})
export class DetailProduitComponent {

  pc: any;

  constructor(
    private route: ActivatedRoute,
    private db: DataBaseService
  ) {}

  ngOnInit(): void {

    const nom = this.route.snapshot.paramMap.get('nom');

    if (nom != null) {
      this.pc = this.db.searchPcByName(nom);
    }
    
  }

}
