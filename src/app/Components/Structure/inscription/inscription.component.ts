import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from '../../../Services/utilisateur-service';
import {Router} from '@angular/router';
import {DepartementService} from '../../../Services/departement-service';
import {Departement} from '../../../Models/departement';
import {Utilisateur} from '../../../Models/utilisateur';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  private signupForm: FormGroup;
  private departements: Departement[];
  private success: boolean;
  private message: string;

  constructor(
    private router: Router,
    private userService: UtilisateurService,
    private fb: FormBuilder,
    private deptService: DepartementService
  ) { }

  ngOnInit() {
    this.deptService.readDepartements().subscribe(departements => {
      this.departements = departements;
    });
    this.signupForm = this.fb.group({
      nomUtilisateur: ['', Validators.required],
      prenomUtilisateur: ['', Validators.required],
      login: ['', Validators.required],
      motDePasse: ['', Validators.required],
      poste: ['', Validators.required],
      nomDepartement: ['', Validators.required]
    });
  }

  onSignup() {
    this.message = null;
    this.userService.createUtilisateur(this.signupForm.value).subscribe( userDto => {
        if (userDto != null) {
          this.success = true;
          sessionStorage.setItem('user', JSON.stringify({login: this.signupForm.controls.login.value}));
        } else { this.success = false; this.message = 'Vous avez déjà un compte, connectez-vous';
        }
    });
  }

  accessToDash() {
    this.router.navigateByUrl('dashboard/vue');
  }

}
