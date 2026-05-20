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






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AcceuilComponent,
    TestBackEndComponent,
    FiltresComponent,
    ProduitComponent,
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
