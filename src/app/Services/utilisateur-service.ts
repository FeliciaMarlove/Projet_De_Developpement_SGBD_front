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
  private utilisateurs: Utilisateur[];
  private utilisateur: Utilisateur;
  constructor(private http: HttpClient) { }

  public getUtilisateurs() {
    return this.utilisateurs;
  }

  public getUtilisateur() {
    return this.utilisateur;
  }

  public readUtilisateurs() {
    return this.http.get<Utilisateur[]>(URI).subscribe( x => this.utilisateurs = x);
  }

  public readUtilisateur(id: number) {
    return this.http.get<Utilisateur>(URI + id).subscribe( x => this.utilisateur = x);
  }

  public createUtilisateur(utilisateur: Utilisateur) {
    const utilisateurDto = {
      nomUtilisateur: utilisateur.nomUtilisateur,
      prenomUtilisateur: utilisateur.prenomUtilisateur,
      login: utilisateur.login,
      motDePasse: utilisateur.motDePasse,
      poste: utilisateur.poste
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
