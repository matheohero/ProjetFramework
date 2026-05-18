import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { TestBackEndComponent } from './test-back-end/test-back-end.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'test', component: TestBackEndComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
