import { Component } from '@angular/core';

@Component({
  selector: 'app-filtres',
  standalone: false,
  templateUrl: './filtres.component.html',
  styleUrl: './filtres.component.css'
})
export class FiltresComponent {

  ramMin: number = 0;
  romMin: number = 0;
  prixMax: number = 5000;

}