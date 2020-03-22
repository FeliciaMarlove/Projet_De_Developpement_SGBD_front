import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilisateurService} from '../../../Services/utilisateur-service';
import {Utilisateur} from '../../../Models/utilisateur';

@Component({
  selector: 'app-utilisateurs-list',
  templateUrl: './utilisateurs-list.component.html',
  styleUrls: ['./utilisateurs-list.component.css']
})
export class UtilisateursListComponent implements OnInit {
  private utilisateurs: Utilisateur[];
  @Output() clickEvent: EventEmitter<Utilisateur> = new EventEmitter<Utilisateur>();

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.initUsers();
  }

  onClick(utilisateur: any) {
    this.clickEvent.emit(utilisateur);
    this.initUsers();
  }

  initUsers() {
    this.utilisateurService.readUtilisateurs().subscribe( utilisateurs => this.utilisateurs = utilisateurs);
  }

  onRefresh() {
    this.initUsers();
  }

}
