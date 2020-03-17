export class Facture {
  constructor(
    private idFacture: number,
    private refFacture: string,
    private dateHeure: Date,
    private isActiveFacture: boolean,
    private validee: boolean,
    private total: number,
    private totalTva: number,
    private totalTTC: number
  ) { }
}

