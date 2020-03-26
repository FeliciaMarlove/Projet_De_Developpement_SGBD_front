import { Component, OnInit } from '@angular/core';
import {Facture} from '../../../Models/facture';
import {FactureService} from '../../../Services/facture-service';
import {ClientService} from '../../../Services/client-service';
import {PaiementService} from '../../../Services/paiement-service';
import {Paiement} from '../../../Models/paiement';
import {Client} from '../../../Models/client';
import {Article} from '../../../Models/article';
import {FactureArticles} from '../../../Models/facture-articles';
import {Display} from '../../../Models/display';
import {ArticleService} from '../../../Services/article-service';

@Component({
  selector: 'app-facture-read',
  templateUrl: './facture-read.component.html',
  styleUrls: ['./facture-read.component.css']
})
export class FactureReadComponent implements OnInit {
  private factureDto: any;
  private client: Client;
  private paiement: Paiement;
  private factureArticles: FactureArticles[] = [];
  private displayArticles: Display[] = [];
  private article: Article;

  constructor(
    private factureService: FactureService,
    private clientService: ClientService,
    private paiementService: PaiementService,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
  }

  receiveFacture(facture: Facture) {
    this.displayArticles = [];
    this.factureDto = facture;
    this.clientService.readClient(this.factureDto.idClient).subscribe( client => this.client = client);
    this.paiementService.readPaiement(this.factureDto.idPaiement).subscribe( paiement => this.paiement = paiement);
    this.factureService.readArticles(this.factureDto.idFacture).subscribe( factArt => {
      this.factureArticles = factArt;
      this.factureArticles.forEach( fa => {
        this.articleService.readArticle(fa.idArticle).subscribe( a => {
          this.article = a;
          this.displayArticles.push(new Display(
            fa.idArticle,
            a.nomArticle,
            a.descArticle,
            fa.quantite,
            fa.montantLigne));
        });
      });
    });
  }

}
