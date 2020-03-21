import {Component, OnInit, ViewChild} from '@angular/core';
import {Article} from '../../../Models/article';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '../../../Services/article-service';
import {TvaService} from '../../../Services/tva-service';
import {Tva} from '../../../Models/tva';
import {ArticlesListComponent} from '../articles-list/articles-list.component';

@Component({
  selector: 'app-articles-admin',
  templateUrl: './articles-admin.component.html',
  styleUrls: ['./articles-admin.component.css']
})
export class ArticlesAdminComponent implements OnInit {
  private article: Article;
  private formulaireMod: FormGroup;
  private formulaireAdd: FormGroup;
  private success: any;
  private nope: string;
  private tvas: Tva[];
  private showAdd: boolean;
  // @ts-ignore
  @ViewChild(ArticlesListComponent) child: ArticlesListComponent;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private tvaService: TvaService
  ) { }

  ngOnInit() {
    this.tvaService.readTvas().subscribe( tvas => this.tvas = tvas);
  }

  receiveArticle(article: Article) {
    this.nope = null;
    this.success = null;
    this.article = article;
    this.initForm();
  }

  initForm() {
    this.formulaireMod = this.fb.group({
      idArticle: [this.article.idArticle],
      nomArticle: [this.article.nomArticle, [Validators.required]],
      descArticle: [this.article.descArticle, [Validators.required]],
      stock: [this.article.stock, [Validators.required]],
      prixUnitaire: [this.article.prixUnitaire, [Validators.required]],
      codeEAN: [this.article.codeEAN, [Validators.required]],
      idTva: [this.article.tva.idTva, [Validators.required]]
    });
  }

  onShowAddSection() {
    this.showAdd = true;
    this.formulaireAdd = this.fb.group({
      nomArticle: ['', [Validators.required]],
      descArticle: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      prixUnitaire: ['', [Validators.required]],
      codeEAN: ['', [Validators.required]],
      idTva: ['', [Validators.required]]
    });
  }

  onAdd() {
    this.nope = null;
    this.success = null;
    if (this.validateEAN(this.formulaireAdd) && this.validateStock(this.formulaireAdd)) {
      this.articleService.createArticle(this.formulaireAdd.value).subscribe(newArticle => {
        this.success = true;
        console.log('article créé', newArticle);
      });
    }
    this.child.initArticles();
  }

  onDelete() {
    this.articleService.deleteArticle(this.article.idArticle).subscribe();
  }

  onModify() {
    this.nope = null;
    this.success = null;
    // console.log(this.formulaireMod.value);
    if (this.validateEAN(this.formulaireMod) && this.validateStock(this.formulaireMod)) {
      // console.log(this.formulaireMod.value)
      this.articleService.updateArticle(this.formulaireMod.controls.idArticle.value, this.formulaireMod.value)
        .subscribe( reussite => {
          this.success = reussite;
         // console.log(this.success ? 'Updated' : 'Failure in update');
        });
    }
  }

  private validateEAN(formulaire: FormGroup): boolean {
    const ean = formulaire.controls.codeEAN.value;
    const str = ean.toString();
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

  private validateStock(formulaire: FormGroup): boolean {
    const stock: string = formulaire.controls.stock.value;
    const str = stock.toString();
    if (str.includes('.')) {
      this.nope = 'Le stock doit être un nombre entier';
      return false;
    }
    return true;
  }
}
