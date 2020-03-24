import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../Services/client-service';
import {ArticleService} from '../../../Services/article-service';
import {PaiementService} from '../../../Services/paiement-service';

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

  constructor(
    private clientService: ClientService,
    private articleService: ArticleService,
    private paiementService: PaiementService
  ) { }

  ngOnInit() {
    this.clientService.readClients().subscribe( clients => this.clients = clients);
    this.paiementService.readPaiements().subscribe( paiements => this.paiements = paiements);
  }

  createFacture() {
    console.log(this.client); // id client ([value])
    console.log(this.paiement); // id
  }



  receiveArticle(article: any) {
    this.article = article;
  }

  plusArticle() {

  }

  minusArticle() {

  }

  addFactArt() {

  }

  deleteArticle() {

  }

}
