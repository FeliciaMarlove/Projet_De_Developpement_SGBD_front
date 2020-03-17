export class Adresse {
  constructor(
    private idAdresse: number,
    private rue: string,
    private numero: number,
    private complementNumero: string,
    private codePostal: number,
    private ville: string,
    private pays: string,
    private isActifAdresse: boolean
  ) { }
}
