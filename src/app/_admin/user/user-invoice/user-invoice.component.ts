import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { IInvoiceRes } from 'src/app/shared/interfaces/responses/invoice-res';
import { IUserRes } from 'src/app/shared/interfaces/responses/user-res';
import { AdminInvoiceService } from 'src/app/shared/services/admin/admin-invoice.service';
import { AdminUsersService } from 'src/app/shared/services/admin/admin-users.service';

@Component({
  selector: 'app-user-invoice',
  templateUrl: './user-invoice.component.html'
})
export class UserInvoiceComponent implements OnInit {

  public user: IUserRes;
  public invoices: Array<IInvoiceRes>;
  public loadingInvoices: boolean;

  constructor(
    private _adminInvoiceService: AdminInvoiceService,
    private _adminUsersService: AdminUsersService,
    private _activatedRoute: ActivatedRoute,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
    private _modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  async loadUser() {
    (await this._loadingCtrl.create()).present();
    let userId = this._activatedRoute.snapshot.paramMap.get('userId');
    this._adminUsersService.getUserById(userId).subscribe(
      res => {
        this._loadingCtrl.dismiss();
        this.user = res.data;
        this.loadInvoices();
      },
      err => {
        this._loadingCtrl.dismiss();
        this._navCtrl.navigateRoot('/auth/admin/users');
      }
    )
  }

  async loadInvoices() {
    this.loadingInvoices = true;
    this._adminInvoiceService.getInvoices().subscribe(
      res => {
        this.loadingInvoices = false;
        this.invoices = res.data
          .filter(i => i.products.length > 0)
          .filter(i => i.customer.customerId == this.user.userId);
      },
      err => {
        this.loadingInvoices = false;
        this.invoices = null;
      }
    )
  }
}
