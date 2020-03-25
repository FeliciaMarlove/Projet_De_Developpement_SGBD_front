export class Display {
  art: string;
  des: string;
  qty: number;
  montLigne: number;

  constructor(art: string, des: string, qty: number, montLigne: number) {
    this.art = art;
    this.des = des;
    this.qty = qty;
    this.montLigne = montLigne;
  }
}
