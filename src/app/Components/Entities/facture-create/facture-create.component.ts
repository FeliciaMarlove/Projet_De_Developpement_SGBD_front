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
  private factureCreated: string;
  private remainingQty: number;
  private warningQty: string;
  private valFact: string;

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
    // console.log(this.client); // id client ([value])
    // console.log(this.paiement); // id paiement ([value])
    this.factureService.createFacture(this.client, this.paiement).subscribe( facture => {
      this.facture = facture;
      this.idFacture = this.facture.idFacture;
      if (this.facture != null) { this.factureCreated = 'Facture en cours d\'édition'; }
      // console.log(this.idFacture);
    });
  }

  receiveArticle(article: any) {
    this.quantite = null;
    this.article = article;
    // console.log(this.article);
  }

  plusArticle() {
    this.quantite = 1;
    this.addFactArt();
  }

  private calculateTht() {
    this.tht = 0;
    this.displayLines.forEach( x => this.tht += x.montLigne);
  }

  minusArticle() {
    this.factureService.articleMinusOne(this.idFacture, this.article.idArticle).subscribe( () => {
    const index = this.displayLines.findIndex( disp => disp.idArt === this.article.idArticle);
    if (this.displayLines[index].qty === 1) {this.displayLines.splice(index, 1); } else {
      this.displayLines[index].qty -= 1;
      this.displayLines[index].montLigne -= this.article.prixUnitaire;
    }
    this.calculateTht();
    });
  }

  addFactArt() {
    this.warningQty = '';
    if (this.quantite && this.idFacture) {
      this.factureService.addArticle(this.idFacture, this.article.idArticle, this.quantite).subscribe( response => {
        this.factureArticle = response;
        console.log(this.factureArticle);
        if (this.factureArticle == null) {
          this.articleService.readArticle(this.article.idArticle).subscribe( art => {
            this.remainingQty = art.stock;
            if (this.remainingQty < this.quantite) {
              this.warningQty = 'Impossible d\'ajouter l\'article, il ne reste plus que ' + this.remainingQty + ' pièces en stock.';
            }
          });
        } else {
          const index = this.displayLines.findIndex( disp => disp.idArt === this.article.idArticle);
          if (index >= 0) {
            this.displayLines[index].qty = this.factureArticle.quantite;
            this.displayLines[index].montLigne = this.factureArticle.montantLigne;
          } else {
            this.displayLines.push(new Display(
              this.article.idArticle,
              this.article.nomArticle,
              this.article.descArticle,
              this.factureArticle.quantite,
              this.factureArticle.montantLigne));
          }
          this.calculateTht();
        }
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
    this.valFact = null;
    this.factureService.validateFacture(this.facture.idFacture).subscribe( factDto => {
     if (factDto != null) { this.valFact = 'Facture clôturée'; }
   });
  }
}
