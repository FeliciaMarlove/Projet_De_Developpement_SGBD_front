import {Tva} from './tva';

export class Article {
    idArticle: number;
    nomArticle: string;
    descArticle: string;
    stock: number;
    prixUnitaire: number;
    codeEAN: string;
    isActifArticle: boolean;
    tva: Tva;
}
