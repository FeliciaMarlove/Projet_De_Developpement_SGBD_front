import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Departement} from '../../../Models/departement';
import {UtilisateurService} from '../../../Services/utilisateur-service';
import {DepartementService} from '../../../Services/departement-service';

@Component({
  selector: 'app-utilisateurs-admin',
  templateUrl: './utilisateurs-admin.component.html',
  styleUrls: ['./utilisateurs-admin.component.css']
})
export class UtilisateursAdminComponent implements OnInit {
  private utilisateurDto: any;
  private formulaireMod: FormGroup;
  private formulaireAdd: FormGroup;
  private departements: Departement[];
  private showAdd: boolean;
  private nope: string;
  private success: any;
  private departement: Departement;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private departementService: DepartementService
  ) { }

  ngOnInit() {
    this.departementService.readDepartements().subscribe( depts => this.departements = depts);
  }

  receiveUtilisateur(utilisateur: any) {
    this.nope = null;
    this.success = null;
    this.utilisateurDto = utilisateur;
    this.departementService.readDepartement(utilisateur.nomDepartement).subscribe( d => {
      this.departement = d;
      this.initForm();
    });
  }

  initForm() {
    this.formulaireMod = this.fb.group({
      nomUtilisateur: [this.utilisateurDto.nomUtilisateur, Validators.required],
      prenomUtilisateur: [this.utilisateurDto.prenomUtilisateur, Validators.required],
      login: [this.utilisateurDto.login, Validators.required],
      poste: [this.utilisateurDto.poste, Validators.required],
      nomDepartement: [this.departement.nomDepartement, Validators.required]
    });
  }

  onShowAddSection() {
    this.showAdd = true;
    this.formulaireAdd = this.fb.group({
      nomUtilisateur: ['', Validators.required],
      prenomUtilisateur: ['', Validators.required],
      login: ['', Validators.required],
      motDePasse: ['', Validators.required],
      poste: ['', Validators.required],
      nomDepartement: ['', Validators.required]
    });
  }

  onAdd() {
    this.nope = null;
    this.success = null;
    this.utilisateurService.createUtilisateur(this.formulaireAdd.value)
      .subscribe(newUser => {
        if (newUser != null) {
          this.success = true;
          console.log('nouvel utilisateur créé', newUser);
        } else {
          this.nope = 'L\'utilisateur existe déjà';
        }
      });
  }

  onDelete() {
    this.utilisateurService.deleteUtilisateur(this.utilisateurDto.idUtilisateur).subscribe();
  }

  onModify() {
    this.nope = null;
    this.success = null;
    this.utilisateurService.updateUtilisateur(this.formulaireMod.controls.login.value, this.formulaireMod.value)
      .subscribe(modification => { if (modification != null) {
        this.success = true;
      } else {
        this.nope = 'L\'utilisateur existe déjà';
      }
      });
  }

}
