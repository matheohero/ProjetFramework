import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { TestBackEndComponent } from './test-back-end/test-back-end.component';
import { RechercheComponent } from './recherche/recherche.component';
import { QuestionsComponent } from './questions/questions.component';
import { FavorisComponent } from './favoris/favoris.component';
import { HistoriqueComponent } from './historique/historique.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { LegalComponent } from './legal/legal.component';
import { ContactComponent } from './contact/contact.component';
import { CreerCompteComponent } from './creer-compte/creer-compte.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'recherche' , component: RechercheComponent},
  { path: 'test', component: TestBackEndComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'favoris',component: FavorisComponent},
  { path: 'historique',component: HistoriqueComponent},
  { path: 'bug-report',component: BugReportComponent},
  { path: 'legal',component: LegalComponent},
  { path: 'contact',component: ContactComponent},
  { path: 'cree-compte',component: CreerCompteComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
