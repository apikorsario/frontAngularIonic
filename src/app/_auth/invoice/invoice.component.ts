import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IInvoiceRes } from 'src/app/shared/interfaces/responses/invoice-res';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoice.component.html'
})
export class InvoiceComponent implements OnInit {

  public invoices: Array<IInvoiceRes>;
  public isLoad: boolean;
  public subscription: Subscription;

  constructor(
    private _invoiceService: InvoiceService,
    private _loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadInvoices();
  }
  
  async loadInvoices() {
    this.isLoad = true;
    (await this._loadingCtrl.create()).present();
    this.subscription = this._invoiceService.getInvoices().subscribe(
      res => {
        this.invoices = res.data;
        this.isLoad = false;
        this._loadingCtrl.dismiss();
      },
      err => {
        this.isLoad = false;
        this._loadingCtrl.dismiss();
      }
    )
  }

  toRefresh(event?: CustomEvent) {
    this.subscription.unsubscribe();
    this.subscription = this._invoiceService.getInvoices().subscribe(
      res => {
        this.invoices = res.data;
        event?.detail.complete();
      },
      err => {
        event?.detail.complete();
      }
    )
  }

}
