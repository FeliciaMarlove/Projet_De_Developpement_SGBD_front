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
  private articles: Article[];
  private article: Article;
  constructor(private http: HttpClient) { }

  public getArticles() {
    return this.articles;
  }

  public getArticle() {
    return this.article;
  }

  public readArticles() {
    return this.http.get<Article[]>(URI).subscribe( x => this.articles = x);
  }

  public readArticle(id: number) {
    return this.http.get<Article>(URI + id).subscribe( x => this.article = x);
  }

  public createArticle(idClient: number, article: Article) {
    const articleDto = {
      descArticle: article.descArticle,
      stock: article.stock,
      prixUnitaire: article.prixUnitaire,
      codeEAN: article.codeEAN
    };
    return this.http.post(URI, articleDto, httpOptions);
  }

  public updateArticle(id: number, article: Article) {
    const articleDto = {
      descArticle: article.descArticle,
      stock: article.stock,
      prixUnitaire: article.prixUnitaire,
      codeEAN: article.codeEAN
    };
    return this.http.put(URI + id, articleDto, httpOptions);
  }

  public deleteArticle(id: number) {
    return this.http.delete(URI + id);
  }
}
