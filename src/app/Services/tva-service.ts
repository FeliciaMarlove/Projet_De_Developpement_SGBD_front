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
  constructor(private http: HttpClient) { }

  public readTvas() {
    return this.http.get<Tva[]>(URI);
  }

  public readTva(id: number) {
    return this.http.get<Tva>(URI + id);
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
