export class Utilisateur {
  constructor(
    private idUtilisateur: number,
    private nomUtilisateur: string,
    private prenomUtilisateur: string,
    private login: string,
    private motDePasse: string,
    private poste: string,
    private isActifUtilisateur: boolean
  ) { }
}
