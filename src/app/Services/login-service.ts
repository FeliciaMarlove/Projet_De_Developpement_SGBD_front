import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Utilisateur} from '../Models/utilisateur';

const URI = 'http://localhost:8080/api/login/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  public login(log: string, password: string): any {
    const loginDto = {
      login: log,
      motDePasse: password
    };
    return this.http.post(URI, loginDto, httpOptions);
  }
}
