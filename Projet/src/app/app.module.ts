import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { TestBackEndComponent } from './test-back-end/test-back-end.component';
import { FormsModule } from '@angular/forms';
import { FiltresComponent } from './filtres/filtres.component';
import { ProduitComponent } from './produit/produit.component';
import { QuestionsComponent } from './questions/questions.component';
import { RechercheComponent } from './recherche/recherche.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { FavorisComponent } from './favoris/favoris.component';
import { HistoriqueComponent } from './historique/historique.component';
import { CreerCompteComponent } from './creer-compte/creer-compte.component';
import { LoginComponent } from './login/login.component';
import { LegalComponent } from './legal/legal.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { QuestionsMoyenComponent } from './questions-moyen/questions-moyen.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AcceuilComponent,
    TestBackEndComponent,
    FiltresComponent,
    ProduitComponent,
    QuestionsComponent,
    RechercheComponent,
    BugReportComponent,
    FavorisComponent,
    HistoriqueComponent,
    CreerCompteComponent,
    LoginComponent,
    LegalComponent,
    FooterComponent,
    ContactComponent,
    DetailProduitComponent,
    QuestionsMoyenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
