import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './Components/Structure/welcome/welcome.component';
import {InscriptionComponent} from './Components/Structure/inscription/inscription.component';
import {DashboardComponent} from './Components/Structure/dashboard/dashboard.component';
import {MenuComponent} from './Components/Structure/menu/menu.component';
import {VueComponent} from './Components/Structure/vue/vue.component';
import {ArticlesAdminComponent} from './Components/Entities/articles-admin/articles-admin.component';
import {ArticlesListComponent} from './Components/Entities/articles-list/articles-list.component';
import {ClientsAdminComponent} from './Components/Entities/clients-admin/clients-admin.component';
import {ClientsListComponent} from './Components/Entities/clients-list/clients-list.component';
import {FactureAdminComponent} from './Components/Entities/facture-admin/facture-admin.component';
import {FactureListComponent} from './Components/Entities/facture-list/facture-list.component';
import {FactureReadComponent} from './Components/Entities/facture-read/facture-read.component';
import {UtilisateursAdminComponent} from './Components/Entities/utilisateurs-admin/utilisateurs-admin.component';
import {UtilisateursListComponent} from './Components/Entities/utilisateurs-list/utilisateurs-list.component';


const routes: Routes = [
  { path: '', component: DashboardComponent}, // for testing purpose, to erase
  // { path: '', component: WelcomeComponent}, // commented for testing purpose
  { path: 'signup', component: InscriptionComponent},
  // dashboard -> canActivate: [AuthGuard]
  { path: 'dashboard', component: DashboardComponent, children : [
      { path: 'vue', component: VueComponent,
        children : [
          { path: 'articles', component: ArticlesAdminComponent},
          { path: 'clients', component: ClientsAdminComponent},
          { path: 'facture', component: FactureAdminComponent},
          { path: 'facture-view', component: FactureReadComponent},
          { path: 'utilisateurs', component: UtilisateursAdminComponent},
        ]
      }
    ]},
  { path: '**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
