import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../../Models/utilisateur';
import {UtilisateurService} from '../../../Services/utilisateur-service';
import {ActivatedRoute} from '@angular/router';

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
    // @ts-ignore
    this.userName = JSON.parse(sessionStorage.getItem('user')).login;
    // @ts-ignore
    this.userService.readUtilisateurs().subscribe( utilisateurs =>  utilisateurs.forEach(
      utilisateur => {if (utilisateur.login.localeCompare(this.userName) === 0) { this.connectedUser = utilisateur; }}
    ));
  }

}
