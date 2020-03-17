export class FactureArticles {
  constructor(
    private idFactureArticles: number,
    private idFacture: number,
    private idArticle: number,
    private quantite: number,
    private montantLigne: number
  ) { }
}
