import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Adresse} from '../Models/adresse';

const URI = 'http://localhost:8080/api/adresse/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AdresseService {
  constructor(private http: HttpClient) {

  }

  public readAdresses() {
    return this.http.get(URI).subscribe();
  }

  public readAdresse(id: number) {
    return this.http.get(URI + id).subscribe();
  }

  public createAdresse(idClient: number, adresse: Adresse) {
    const adresseDto = {
       rue: adresse.rue,
       numero: adresse.numero,
       complementNumero: adresse.complementNumero,
       codePostal: adresse.codePostal,
       ville: adresse.ville,
       pays: adresse.pays
    }
    return this.http.post(URI + 'client/' + idClient, adresseDto);
  }
}
