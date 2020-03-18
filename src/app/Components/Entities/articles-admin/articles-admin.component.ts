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
  private nope: string;
  private tvas: Tva[];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private tvaService: TvaService
  ) { }

  ngOnInit() {

  }

  receiveArticle(article: Article) {
    this.nope = null;
    this.modifie = null;
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
    this.nope = null;
    this.modifie = null;
    console.log(this.formulaire.value);
    if (this.validateEAN() && this.validateStock()) {
      console.log(this.formulaire.value)
      this.articleService.updateArticle(this.formulaire.controls.idArticle.value, this.formulaire.value)
        .subscribe( reussite => {
          this.modifie = reussite;
          console.log(this.modifie ? 'Updated' : 'Failure in update');
        });
    }
  }

  private validateEAN(): boolean {
    const ean = this.formulaire.controls.codeEAN.value;
    const str = ean.toString();
    console.log(str.length < 12 || str.length > 13)
    if (str.length < 12 || str.length > 13) {
      this.nope = 'Le code EAN doit contenir 12 ou 13 chiffres';
      return false;
    }
    if (str.includes('.')) {
      this.nope = 'Le code EAN doit être un nombre entier';
      return false;
    }
    return true;
  }

  private validateStock(): boolean {
    const stock: string = this.formulaire.controls.stock.value;
    const str = stock.toString();
    if (str.includes('.')) {
      this.nope = 'Le stock doit être un nombre entier';
      return false;
    }
    return true;
  }
}
