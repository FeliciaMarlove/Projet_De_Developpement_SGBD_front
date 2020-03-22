import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../../Models/utilisateur';
import {UtilisateurService} from '../../../Services/utilisateur-service';

@Component({
  selector: 'app-vue',
  templateUrl: './vue.component.html',
  styleUrls: ['./vue.component.css']
})
export class VueComponent implements OnInit {
  private userName: string;
  private connectedUser: Utilisateur;

  constructor(private userService: UtilisateurService) { }

  ngOnInit() {
    this.userName = JSON.parse(sessionStorage.getItem('user')).login;
    this.userService.readUtilisateurs().subscribe( utilisateurs =>  utilisateurs.forEach(
      utilisateur => {if (utilisateur.login.localeCompare(this.userName) === 0) { this.connectedUser = utilisateur; }}
    ));
  }

}
