import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Article} from '../Models/article';

const URI = 'http://localhost:8080/api/article/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }

  public readArticles() {
    return this.http.get<Article[]>(URI);
  }

  public readArticle(id: number) {
    return this.http.get<Article>(URI + id);
  }

  public createArticle(idClient: number, article: any) {
    const articleDto = {
      nomArticle: article.nomArticle,
      descArticle: article.descArticle,
      stock: article.stock,
      prixUnitaire: article.prixUnitaire,
      codeEAN: article.codeEAN,
      idTva: article.idTva
    };
    return this.http.post(URI, articleDto, httpOptions);
  }

  public updateArticle(id: number, article: any) {
    const articleDto = {
      nomArticle: article.nomArticle,
      descArticle: article.descArticle,
      stock: article.stock,
      prixUnitaire: article.prixUnitaire,
      codeEAN: article.codeEAN,
      idTva: article.idTva
    };
    return this.http.put(URI + id, articleDto, httpOptions);
  }

  public deleteArticle(id: number) {
    return this.http.delete(URI + id);
  }
}
