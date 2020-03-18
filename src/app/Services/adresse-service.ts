import {Injectable} from '@angular/core';
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
  constructor(private http: HttpClient) { }

  public readAdresses() {
    return this.http.get<Adresse[]>(URI);
  }

  public readAdresse(id: number) {
    return this.http.get<Adresse>(URI + id);
  }

  public createAdresse(idClient: number, adresse: Adresse) {
    const adresseDto = {
       rue: adresse.rue,
       numero: adresse.numero,
       complementNumero: adresse.complementNumero,
       codePostal: adresse.codePostal,
       ville: adresse.ville,
       pays: adresse.pays
    };
    return this.http.post(URI + 'client/' + idClient, adresseDto, httpOptions);
  }

  public updateAdresse(id: number, adresse: Adresse) {
    const adresseDto = {
      rue: adresse.rue,
      numero: adresse.numero,
      complementNumero: adresse.complementNumero,
      codePostal: adresse.codePostal,
      ville: adresse.ville,
      pays: adresse.pays
    };
    return this.http.put(URI + id, adresseDto, httpOptions);
  }

  public deleteAdresse(id: number) {
    return this.http.delete(URI + id);
  }
}
