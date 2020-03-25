export class Display {
  idArt: number;
  art: string;
  des: string;
  qty: number;
  montLigne: number;


  constructor(idArt: number, art: string, des: string, qty: number, montLigne: number) {
    this.idArt = idArt;
    this.art = art;
    this.des = des;
    this.qty = qty;
    this.montLigne = montLigne;
  }
}
