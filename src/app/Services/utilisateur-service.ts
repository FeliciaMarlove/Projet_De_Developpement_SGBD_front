import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Utilisateur} from '../Models/utilisateur';

const URI = 'http://localhost:8080/api/utilisateur/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  constructor(private http: HttpClient) { }

  public readUtilisateurs() {
    return this.http.get<Utilisateur[]>(URI);
  }

  public readUtilisateur(id: number) {
    return this.http.get<Utilisateur>(URI + id);
  }

  public createUtilisateur(utilisateur: any) {
    // const utilisateurDto = {
    //   nomUtilisateur: utilisateur.nomUtilisateur,
    //   prenomUtilisateur: utilisateur.prenomUtilisateur,
    //   login: utilisateur.login,
    //   motDePasse: utilisateur.motDePasse,
    //   poste: utilisateur.poste,
    //   nomDepartement: utilisateur.nomDepartement
    // };
    return this.http.post(URI, utilisateur, httpOptions);
  }

  public updateUtilisateur(login: string, utilisateurDto: any) {
    return this.http.put(URI + login, utilisateurDto, httpOptions);
  }

  public deleteUtilisateur(id: number) {
    return this.http.delete(URI + id);
  }
}
