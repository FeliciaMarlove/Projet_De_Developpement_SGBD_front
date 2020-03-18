import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Paiement} from '../Models/paiement';

const URI = 'http://localhost:8080/api/paiement/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  constructor(private http: HttpClient) { }

  public readPaiements() {
    return this.http.get<Paiement[]>(URI);
  }

  public readPaiement(id: number) {
    return this.http.get<Paiement>(URI + id);
  }

  public createPaiement(paiement: Paiement) {
    const paiementDto = {
      nomPaiement: paiement.nomPaiement,
      descPaiement: paiement.descPaiement
    };
    return this.http.post(URI, paiementDto, httpOptions);
  }

  public updatePaiement(id: number, paiement: Paiement) {
    const paiementDto = {
      nomPaiement: paiement.nomPaiement,
      descPaiement: paiement.descPaiement
    };
    return this.http.put(URI + id, paiementDto, httpOptions);
  }

  public deletePaiement(id: number) {
    return this.http.delete(URI + id);
  }
}
