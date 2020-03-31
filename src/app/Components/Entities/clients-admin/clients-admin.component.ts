import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../Services/client-service';
import {AdresseService} from '../../../Services/adresse-service';
import {Adresse} from '../../../Models/adresse';
import {FindValueOperator} from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-clients-admin',
  templateUrl: './clients-admin.component.html',
  styleUrls: ['./clients-admin.component.css']
})
export class ClientsAdminComponent implements OnInit {
  private formulaireMod: FormGroup;
  private formulaireAdd: FormGroup;
  private formulaireAdresse: FormGroup;
  private success: boolean;
  private successAd: boolean;
  private nope: string;
  private nopeAdresse: string;
  private showAdd: boolean;
  private clientDto: any;
  private adressesDtos: any;
  private selectedAdresse: any;
  private listePays: string[] = ['Belgique', 'France'];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private adresseService: AdresseService
  ) { }

  ngOnInit() {
  }

  initAdresses() {
    this.adresseService.readFromClient(this.clientDto.idClient).subscribe( adresses => this.adressesDtos = adresses);
  }

  receiveClient(client: any) {
    this.nope = null;
    this.success = null;
    this.clientDto = client;
    this.initAdresses();
    this.initForm();
    this.initAdresseForm();
  }

  initForm() {
    this.formulaireMod = this.fb.group({
      nomClient: [this.clientDto.nomClient, Validators.required],
      prenomClient: [this.clientDto.prenomClient, Validators.required],
      telephoneClient: [this.clientDto.telephoneClient, Validators.required],
      dateNaissanceClient: [this.clientDto.dateNaissanceClient, Validators.required]
    });
  }

  onShowAddSection() {
    this.showAdd = true;
    this.formulaireAdd = this.fb.group({
      nomClient: ['', Validators.required],
      prenomClient: ['', Validators.required],
      telephoneClient: ['', Validators.required],
      dateNaissanceClient: ['', Validators.required]
    });
  }

  onAdd() {
    this.nope = null;
    this.success = null;
    if (this.validateTel(this.formulaireAdd)) {
      this.clientService.createClient(this.formulaireAdd.value).subscribe( newClient => {
        if (newClient != null) {
          this.success = true;
          console.log('client créé', newClient);
        }
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
        console.log(cltDto);
        if (cltDto != null) { this.success = true; }
      });
    }
  }

  onSelectAdss(adresseDto: any) {
    this.selectedAdresse = adresseDto;
  }

  onDeleteAd(adresse: any) {
    this.adresseService.deleteAdresse(adresse.idAdresse).subscribe();
  }

  onAddAdresse() {
    this.successAd = null;
    this.nopeAdresse = null;
    if (this.validateCP(this.formulaireAdresse)) {
      this.adresseService.createAdresse(this.clientDto.idClient, this.formulaireAdresse.value).subscribe( adresses => {
        if (adresses != null) {
          this.successAd = true;
        }
      });
    }
  }

  initAdresseForm() {
    this.formulaireAdresse = this.fb.group({
      rue: ['', Validators.required],
      numero: ['', Validators.required],
      complementNumero: [''],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required]
    });
  }

  private validateTel(formulaire: FormGroup): boolean {
    if (formulaire.controls.telephoneClient.value) {
      const tel = formulaire.controls.telephoneClient.value;
      const str = tel.toString();
      if (str.length < 8) {
        this.nope = 'Le numéro de téléphone doit comporter au moins 8 chiffres';
        return false;
      }
    }
    return true;
  }

  private validateCP(formulaire: FormGroup): boolean {
    const cp = formulaire.controls.codePostal.value;
    const str = cp.toString();
    if (str.length < 4 || str.length > 5) {
      this.nopeAdresse = 'Le code postal doit contenir 4 ou 5 chiffres';
      return false;
    }
    return true;
  }

}
