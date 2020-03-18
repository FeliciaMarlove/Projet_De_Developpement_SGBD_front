import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './Components/Structure/welcome/welcome.component';
import { ArticlesListComponent } from './Components/Entities/articles-list/articles-list.component';
import { ClientsListComponent } from './Components/Entities/clients-list/clients-list.component';
import { UtilisateursListComponent } from './Components/Entities/utilisateurs-list/utilisateurs-list.component';
import { FactureAdminComponent } from './Components/Entities/facture-admin/facture-admin.component';
import { UtilisateursAdminComponent } from './Components/Entities/utilisateurs-admin/utilisateurs-admin.component';
import { ArticlesAdminComponent } from './Components/Entities/articles-admin/articles-admin.component';
import { ClientsAdminComponent } from './Components/Entities/clients-admin/clients-admin.component';
import { HeaderComponent } from './Components/Structure/header/header.component';
import { DashboardComponent } from './Components/Structure/dashboard/dashboard.component';
import { InscriptionComponent } from './Components/Structure/inscription/inscription.component';
import { MenuComponent } from './Components/Structure/menu/menu.component';
import { FactureReadComponent } from './Components/Entities/facture-read/facture-read.component';
import { FactureListComponent } from './Components/Entities/facture-list/facture-list.component';
import { VueComponent } from './Components/Structure/vue/vue.component';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ArticlesListComponent,
    ClientsListComponent,
    UtilisateursListComponent,
    FactureAdminComponent,
    UtilisateursAdminComponent,
    ArticlesAdminComponent,
    ClientsAdminComponent,
    HeaderComponent,
    DashboardComponent,
    InscriptionComponent,
    MenuComponent,
    FactureReadComponent,
    FactureListComponent,
    VueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
