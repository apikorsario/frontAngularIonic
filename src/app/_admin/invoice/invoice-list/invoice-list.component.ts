import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { IInvoiceRes } from 'src/app/shared/interfaces/responses/invoice-res';
import { AdminInvoiceService } from 'src/app/shared/services/admin/admin-invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit {

  public invoices: Array<IInvoiceRes>;

  constructor(
    private _adminInvoiceService: AdminInvoiceService,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadInvoices();
  }
  
  async loadInvoices() {
    (await this._loadingCtrl.create()).present();

    this._adminInvoiceService.getInvoices().subscribe(
      res => {
        this.invoices = res.data;
        this._loadingCtrl.dismiss();
      },
      err => {
        this._loadingCtrl.dismiss();
        this._navCtrl.navigateRoot('/');
      }
    )
  }
  
  doRefresh(event: any) {
    this._adminInvoiceService.getInvoices().subscribe(
      res => {
        event.detail.complete();
        this.invoices = res.data;
      },
      err => {
        event.detail.complete();
        this._navCtrl.navigateRoot('/');
      }
    )
  }
}
