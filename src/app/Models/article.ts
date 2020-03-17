export class Article {
  constructor(
    private idArticle: number,
    private descArticle: string,
    private stock: number,
    private prixUnitaire: number,
    private codeEAN: string,
    private isActifArticle: boolean
  ) {}
}
