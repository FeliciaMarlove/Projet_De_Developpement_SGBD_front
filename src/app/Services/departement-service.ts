import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Departement} from '../Models/departement';

const URI = 'http://localhost:8080/api/departement/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private departements: Departement[];
  private departement: Departement;
  constructor(private http: HttpClient) { }

  public getDepartements() {
    return this.departements;
  }

  public getDepartement() {
    return this.departement;
  }

  public readDepartements() {
    return this.http.get<Departement[]>(URI).subscribe( x => this.departements = x);
  }

  public readDepartement(id: number) {
    return this.http.get<Departement>(URI + id).subscribe( x => this.departement = x);
  }

  public createDepartement(idClient: number, departement: Departement) {
    const departementDto = {
      nomDepartement : departement.nomDepartement
    };
    return this.http.post(URI, departementDto, httpOptions);
  }

  public updateDepartement(id: number, departement: Departement) {
    const departementDto = {
      nomDepartement : departement.nomDepartement
    };
    return this.http.put(URI + id, departementDto, httpOptions);
  }

  public deleteDepartement(id: number) {
    return this.http.delete(URI + id);
  }
}
