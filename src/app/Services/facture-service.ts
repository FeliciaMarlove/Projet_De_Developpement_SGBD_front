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

  public createFacture(idCt: number, idPt: number) {
    const factureDto = {
      idClient: idCt,
      idPaiement: idPt
    };
    return this.http.post(URI, factureDto, httpOptions);
  }

  public validateFacture(id: number) {
    return this.http.get(URI + id + '/validate');
  }

  public deleteFacture(id: number) {
    return this.http.delete(URI + id);
  }

  public addArticle(id: number, idArt: number, qte: number) {
    const factArtDto = {
      idFacture: id,
      idArticle: idArt,
      quantite: qte
    };
    return this.http.put(URI + id + '/add', factArtDto);
  }

  public articleMinusOne(id: number, idArt: number) {
    return this.http.get(URI + id + '/minus/' + idArt);
  }

  public deleteArticle(id: number, idArt: number) {
    return this.http.get(URI + id + '/del/' + idArt);
  }

  public readArticles(id: number) {
    return this.http.get(URI + id + '/articles');
  }
}
