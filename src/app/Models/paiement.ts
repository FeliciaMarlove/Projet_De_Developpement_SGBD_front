export class Paiement {
  constructor(
    private idPaiement: number,
    private nomPaiement: string,
    private descPaiement: string,
    private isActifPaiement: boolean
  ) { }
}
