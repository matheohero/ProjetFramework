import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { TestBackEndComponent } from './test-back-end/test-back-end.component';
import { RechercheComponent } from './recherche/recherche.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'recherche' , component: RechercheComponent},
  { path: 'test', component: TestBackEndComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
