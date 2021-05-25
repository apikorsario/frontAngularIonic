import { Component, Input, OnInit } from '@angular/core';
import { IInvoiceRes } from '../../interfaces/responses/invoice-res';

@Component({
  selector: 'ion-invoice',
  templateUrl: './ion-invoice.component.html'
})
export class IonInvoiceComponent implements OnInit {

  @Input() invoice: IInvoiceRes;
  @Input() button: string;
  @Input() detail: boolean;
  public showProducts: boolean;

  constructor() { }

  ngOnInit() {
    switch (this.invoice.payment.methodName) {
      case 'transfer': this.invoice.payment.methodName = 'transferencia' ;break;
      case 'cash': this.invoice.payment.methodName = 'efectivo' ;break;
      case 'credit cart': this.invoice.payment.methodName = 'tarjeta de credito' ;break;
      case 'debit cart': this.invoice.payment.methodName = 'tarjeta de debito' ;break;
    }

    if (this.invoice.products.length) {
      this.invoice['itemCount'] = this.invoice.products.map(p => p.quantity)
        .reduce((previus, current) => {
          return previus + current;
        })
    }
  }

}
