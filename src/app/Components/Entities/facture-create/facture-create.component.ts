import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../Services/client-service';
import {ArticleService} from '../../../Services/article-service';
import {PaiementService} from '../../../Services/paiement-service';
import {FactureService} from '../../../Services/facture-service';
import {FactureArticles} from '../../../Models/facture-articles';
import {Display} from '../../../Models/display';
import {Facture} from '../../../Models/facture';

@Component({
  selector: 'app-facture-create',
  templateUrl: './facture-create.component.html',
  styleUrls: ['./facture-create.component.css']
})
export class FactureCreateComponent implements OnInit {
  private clients: any[];
  private paiements: any[];
  private client: any;
  private paiement: any;
  private article: any;
  private quantite: number;
  private factureArticle: any;
  private idFacture: number;
  private facture: any;
  private displayLines: Display[] = [];
  private tht = 0;

  constructor(
    private clientService: ClientService,
    private articleService: ArticleService,
    private paiementService: PaiementService,
    private factureService: FactureService
  ) { }

  ngOnInit() {
    this.clientService.readClients().subscribe( clients => this.clients = clients);
    this.paiementService.readPaiements().subscribe( paiements => this.paiements = paiements);
  }

  createFacture() {
    // DISABLE BOUTON CREER FACTURE + AJOUTER UN ANNULER -> finetuning
    // console.log(this.client); // id client ([value])
    // console.log(this.paiement); // id paiement ([value])
    this.factureService.createFacture(this.client, this.paiement).subscribe( facture => {
      this.facture = facture;
      this.idFacture = this.facture.idFacture;
      // console.log(this.idFacture);
    });
  }

  receiveArticle(article: any) {
    this.quantite = null;
    this.article = article;
    console.log(this.article)
  }

  plusArticle() {
    this.quantite = 1;
    this.addFactArt();
  }

  private calculateTht() {
    this.tht = 0;
    this.displayLines.forEach( x => this.tht += x.montLigne);
  }

  minusArticle() { // click / facture ! logique fctionne mais
    this.factureService.articleMinusOne(this.idFacture, this.article.idArticle).subscribe( () => {
    const index = this.displayLines.findIndex( disp => disp.idArt);
    if (this.displayLines[index].qty === 1) {this.displayLines.splice(index, 1); } else {
      this.displayLines[index].qty -= 1;
      this.displayLines[index].montLigne -= this.article.prixUnitaire;
    }
    this.calculateTht();
    });
  }

  addFactArt() {
    if (this.quantite && this.idFacture) {
      this.factureService.addArticle(this.idFacture, this.article.idArticle, this.quantite).subscribe( response => {
        this.factureArticle = response;
        // console.log(this.factureArticle);
        const index = this.displayLines.findIndex( disp => disp.idArt);
        if (index >= 0) {
          this.displayLines[index].qty = this.factureArticle.quantite;
          this.displayLines[index].montLigne = this.factureArticle.montantLigne;
        } else {
          this.displayLines.push(new Display(this.article.idArticle, this.article.nomArticle, this.article.descArticle, this.factureArticle.quantite, this.factureArticle.montantLigne));
        }
        this.calculateTht();
      });
    }

  }

  deleteArticle() {
    this.factureService.deleteArticle(this.idFacture, this.article.idArticle).subscribe( () => {
      const index = this.displayLines.findIndex( d => d.idArt = this.article.idArticle);
      this.displayLines.splice(index, 1);
      this.calculateTht();
    });
  }

  validate() {

  }

}
