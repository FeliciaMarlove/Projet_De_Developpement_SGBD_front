import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FactureService} from '../../../Services/facture-service';
import {Facture} from '../../../Models/facture';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {
  private factures: Facture[] = [];
  @Output() clickEvent: EventEmitter<Facture> = new EventEmitter<Facture>();

  constructor(private factureService: FactureService) { }

  ngOnInit() {
    this.readValidatedFactures();
    this.readAllFactures();
  }

  onClick(facture: Facture) {
    this.clickEvent.emit(facture);
  }

  readValidatedFactures() {
    this.factureService.readFactures().subscribe( facts => {
      this.factures = facts.filter(fact => fact.validee === true);
      // console.log(this.factures);
    });
  }

  readAllFactures() {
    this.factureService.readFactures().subscribe( facts => {
      // console.log(facts);
    });
  }

}
