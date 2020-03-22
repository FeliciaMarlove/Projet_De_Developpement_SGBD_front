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
    const utilisateurDto = {
      nomUtilisateur: utilisateur.nomUtilisateur,
      prenomUtilisateur: utilisateur.prenomUtilisateur,
      login: utilisateur.login,
      motDePasse: utilisateur.motDePasse,
      poste: utilisateur.poste,
      nomDepartement: utilisateur.nomDepartement
    };
    return this.http.post(URI, utilisateurDto, httpOptions);
  }

  public updateUtilisateur(id: number, utilisateur: Utilisateur) {
    const utilisateurDto = {
      nomUtilisateur: utilisateur.nomUtilisateur,
      prenomUtilisateur: utilisateur.prenomUtilisateur,
      login: utilisateur.login,
      motDePasse: utilisateur.motDePasse,
      poste: utilisateur.poste
    };
    return this.http.put(URI + id, utilisateurDto, httpOptions);
  }

  public deleteUtilisateur(id: number) {
    return this.http.delete(URI + id);
  }
}
