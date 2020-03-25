import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../Services/client-service';
import {ArticleService} from '../../../Services/article-service';
import {PaiementService} from '../../../Services/paiement-service';
import {FactureService} from '../../../Services/facture-service';
import {FactureArticles} from '../../../Models/facture-articles';
import {Display} from '../../../Models/display';

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
  private factArticles: FactureArticles[];
  private factureArticle: FactureArticles;
  private idFacture: number;
  private displayLines: Display[] = [];

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
      this.idFacture = facture.idFacture;
      console.log(this.idFacture);
    });
  }

  receiveArticle(article: any) {
    this.quantite = null;
    this.article = article;
  }

  plusArticle() {

  }

  minusArticle() {

  }

  addFactArt() {
    console.log(this.idFacture);
    console.log(this.quantite);
    if (this.quantite && this.idFacture) {
      this.factureService.addArticle(this.idFacture, this.article.idArticle, this.quantite).subscribe( response => {
        this.factureArticle = response; console.log(this.factureArticle);
        // @ts-ignore
        this.displayLines.push(new Display(this.article.nomArticle, this.article.descArticle, this.quantite, this.factureArticle.montantLigne));
        console.log(this.displayLines);
      });
    }
  }

  deleteArticle() {

  }

}
