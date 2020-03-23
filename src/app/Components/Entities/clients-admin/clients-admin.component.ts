import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../Services/client-service';
import {AdresseService} from '../../../Services/adresse-service';
import {Adresse} from '../../../Models/adresse';

@Component({
  selector: 'app-clients-admin',
  templateUrl: './clients-admin.component.html',
  styleUrls: ['./clients-admin.component.css']
})
export class ClientsAdminComponent implements OnInit {
  private formulaireMod: FormGroup;
  private formulaireAdd: FormGroup;
  private success: any;
  private nope: string;
  private showAdd: boolean;
  private clientDto: any;
  private adressesDtos: Adresse[];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private adresseService: AdresseService
  ) { }

  ngOnInit() {
    this.adresseService.readAdresses().subscribe(ads => this.adressesDtos = ads);
  }

  receiveClient(client: any) {
    this.nope = null;
    this.success = null;
    this.clientDto = client;
    this.initForm();
  }

  initForm() {
    this.formulaireMod = this.fb.group({
      nomClient: [this.clientDto.nomClient, Validators.required],
      prenomClient: [this.clientDto.prenomClient, Validators.required],
      telephoneClient: [this.clientDto.telephoneClient],
      dateNaissanceClient: [this.clientDto.dateNaissanceClient]
    });
  }

  onShowAddSection() {
    this.showAdd = true;
    this.formulaireAdd = this.fb.group({
      nomClient: ['', Validators.required],
      prenomClient: ['', Validators.required],
      telephoneClient: [''],
      dateNaissanceClient: ['']
    });
  }

  onAdd() {
    this.nope = null;
    this.success = null;
    if (this.validateTel(this.formulaireAdd)) {
      this.clientService.createClient(this.clientDto.idClient, this.formulaireAdd.value).subscribe( newClient => {
        this.success = true;
        console.log('client créé', newClient);
      });
    }
  }

  onDelete() {
    this.clientService.deleteClient(this.clientDto.idClient).subscribe();
  }

  onModify() {
    this.nope = null;
    this.success = null;
    if (this.validateTel(this.formulaireMod)) {
      this.clientService.updateClient(this.clientDto.idClient, this.formulaireMod.value).subscribe( cltDto => {
        if (cltDto != null) { this.success = true; }
      });
    }
  }

  private validateTel(formulaire: FormGroup): boolean {
    if (formulaire.controls.telephone) {
      const tel = formulaire.controls.telephone.value;
      const str = tel.toString();
      if (str.length < 8) {
        this.nope = 'Le numéro de téléphone doit comporter au moins 8 chiffres';
        return false;
      }
    }
    return true;
  }

}
