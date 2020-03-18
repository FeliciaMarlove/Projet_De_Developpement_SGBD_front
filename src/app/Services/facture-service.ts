import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Facture} from '../Models/facture';

const URI = 'http://localhost:8080/api/facture/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  constructor(private http: HttpClient) { }

  public readFactures() {
    return this.http.get<Facture[]>(URI);
  }

  public readFacture(id: number) {
    return this.http.get<Facture>(URI + id);
  }

  public createFacture(idClient: number, facture: Facture) {
    const factureDto = {
      idClient: facture.client.idClient,
      idPaiement: facture.paiement.idPaiement
    };
    return this.http.post(URI, factureDto, httpOptions);
  }

  public updateFacture(id: number, facture: Facture) {
    const factureDto = {
      idClient: facture.client.idClient,
      idPaiement: facture.paiement.idPaiement
    };
    return this.http.put(URI + id, factureDto, httpOptions);
  }

  public deleteFacture(id: number) {
    return this.http.delete(URI + id);
  }
}
