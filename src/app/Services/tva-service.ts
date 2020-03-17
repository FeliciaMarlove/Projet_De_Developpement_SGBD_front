import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tva} from '../Models/tva';

const URI = 'http://localhost:8080/api/tva/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TvaService {
  private tvas: Tva[];
  private tva: Tva;
  constructor(private http: HttpClient) { }

  public getTvas() {
    return this.tvas;
  }

  public getTva() {
    return this.tva;
  }

  public readTvas() {
    return this.http.get<Tva[]>(URI).subscribe( x => this.tvas = x);
  }

  public readTva(id: number) {
    return this.http.get<Tva>(URI + id).subscribe( x => this.tva = x);
  }

  public createTva(tva: Tva) {
    const tvaDto = {
      tauxTva: tva.tauxTva
    };
    return this.http.post(URI, tvaDto, httpOptions);
  }

  public updateTva(id: number, tva: Tva) {
    const tvaDto = {
      tauxTva: tva.tauxTva
    };
    return this.http.put(URI + id, tvaDto, httpOptions);
  }

  public deleteTva(id: number) {
    return this.http.delete(URI + id);
  }
}
