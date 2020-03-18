import { Component, OnInit } from '@angular/core';
import {Article} from '../../../Models/article';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '../../../Services/article-service';
import {TvaService} from '../../../Services/tva-service';
import {Tva} from '../../../Models/tva';

@Component({
  selector: 'app-articles-admin',
  templateUrl: './articles-admin.component.html',
  styleUrls: ['./articles-admin.component.css']
})
export class ArticlesAdminComponent implements OnInit {
  private article: Article;
  private formulaire: FormGroup;
  private modifie: any;
  private tvas: Tva[];
  private articles: Article[];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private tvaService: TvaService
  ) { }

  ngOnInit() {

  }

  receiveArticle(article: Article) {
    this.modifie = false;
    this.article = article;
    this.initForm();
    this.tvaService.readTvas().subscribe( tvas => this.tvas = tvas);
  }

  initForm() {
    this.formulaire = this.fb.group({
      idArticle: [this.article.idArticle],
      nomArticle: [this.article.nomArticle, [Validators.required]],
      descArticle: [this.article.descArticle, [Validators.required]],
      stock: [this.article.stock, [Validators.required]],
      prixUnitaire: [this.article.prixUnitaire, [Validators.required]],
      codeEAN: [this.article.codeEAN, [Validators.required]],
      idTva: [this.article.tva.idTva, [Validators.required]]
    });
    console.log(this.formulaire.invalid);
  }

  modify() {
    // check nombres entiers stock et ean ou valeur absolue direct?
    // + ean 12 ou 13 chiffres
    console.log(this.formulaire.value);
    this.articleService.updateArticle(this.formulaire.controls.idArticle.value, this.formulaire.value)
        .subscribe( reussite => this.modifie = reussite);
    this.articleService.readArticles().subscribe( articles => this.articles = articles);
    // la liste (child) doit reload mtnt !
  }
}
