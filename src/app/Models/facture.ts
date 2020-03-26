import {Client} from './client';
import {Paiement} from './paiement';

export class Facture {
    idFacture: number;
    refFacture: string;
    dateHeure: Date;
    activeFacture: boolean;
    validee: boolean;
    total: number;
    totalTva: number;
    totalTTC: number;
    client: Client;
    paiement: Paiement;
}

