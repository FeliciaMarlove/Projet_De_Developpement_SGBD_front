import {Departement} from './departement';

export class Utilisateur {
    idUtilisateur: number;
    nomUtilisateur: string;
    prenomUtilisateur: string;
    login: string;
    motDePasse: string;
    poste: string;
    departement: Departement;
    isActifUtilisateur: boolean;
}
