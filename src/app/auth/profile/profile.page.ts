import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { IPopOption } from 'src/app/shared/interfaces/pop-option';
import { IUserRes } from 'src/app/shared/interfaces/responses/user-res';
import { UserOptionComponent } from 'src/app/shared/popovers/user-option/user-option.component';
import { UserService } from 'src/app/shared/services/user.service';
import { ChangePasswordComponent } from 'src/app/shared/modals/change-password/change-password.component';
import { LockerService } from 'src/app/shared/services/locker.service';
import { Subscription } from 'rxjs';
import { ILockerRes } from 'src/app/shared/interfaces/responses/locker-res';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { IInvoiceRes } from 'src/app/shared/interfaces/responses/invoice-res';
import { QrCodePage } from '../qr-code/qr-code.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html'
})
export class ProfilePage implements OnInit {
  public user: IUserRes;
  public locker: ILockerRes;
  public invoices: Array<IInvoiceRes>;
  public popOptions: Array<IPopOption>;
  public userSubs: Subscription;
  public lockerSubs: Subscription;
  public invoiceSubs: Subscription;

  constructor(
    private _userService: UserService,
    private _lockerService: LockerService,
    private _invoiceService: InvoiceService,
    private _navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _popoverCtrl: PopoverController,
    private _modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.loadUser();
    this.loadLocker();
    this.loadInvoices();
  }
  
  loadOptions() {
    this.popOptions = [
      { role: 'qr', title: 'Mi Codigo', icon: 'qr-code', visible: true },
      { role: 'password', title: 'Cambiar Contraceña', icon: 'key', visible: true }
    ];
  }

  async loadUser() {
    (await this._loadingCtrl.create()).present();
    this.userSubs = this._userService.getProfile().subscribe(
      res => {
        this.user = res.data;
        this.loadOptions();
        this._loadingCtrl.dismiss();
      },
      err => {
        this._loadingCtrl.dismiss();
        this._navCtrl.navigateRoot('/');
      }
    )
  }

  loadLocker() {
    this.lockerSubs = this._lockerService.getLocker().subscribe(
      res => this.locker = res.data
    )
  }

  loadInvoices() {
    this.invoiceSubs = this._invoiceService.getInvoices().subscribe(
      res => this.invoices = res.data
    )
  }

  doRefresh(event: CustomEvent) {
    this.doRefreshUser(event);
    this.doRefreshLocker(event);
    this.doRefreshInvoices(event);
  }

  doRefreshUser(event: CustomEvent) {
    this.userSubs.unsubscribe();
    this.userSubs = this._userService.getProfile().subscribe(
      res => {
        this.user = res.data;
        event?.detail.complete();
      },
      err => event?.detail.complete()
    )
  }

  doRefreshLocker(event: CustomEvent) {
    this.lockerSubs.unsubscribe();
    this.lockerSubs = this._lockerService.getLocker().subscribe(
      res => {
        this.locker = res.data;
        event?.detail.complete();
      },
      err => event?.detail.complete()
    )
  }

  doRefreshInvoices(event: CustomEvent) {
    this.invoiceSubs.unsubscribe();
    this.invoiceSubs = this._invoiceService.getInvoices().subscribe(
      res => {
        this.invoices = res.data;
        event?.detail.complete();
      },
      err => event?.detail.complete()
    )
  }

  
  public get totalBuyed() : number {
    if (!this.invoices.length) return 0;
    let total = this.invoices.map(i => i?.total).reduce((previus, current) => {
      return previus + current;
    });
    return total || 0;
  }
  

  async clickedPopover(event) {
    let modal = await this._popoverCtrl.create({
      component: UserOptionComponent,
      componentProps: { popOptions: this.popOptions },
      event
    })
    modal.present();
    let res = await modal.onWillDismiss();
    switch (res.role) {
      case 'qr': await this.showQr(); break;
      case 'password': this.showChangePassword(); break;
    }
  }

  async showQr() {
    let modal = await this._modalCtrl.create({
      component: QrCodePage,
      componentProps: { openFromModal: true }
    });
    modal.present();
  }

  async showChangePassword() {
    let modal = await this._modalCtrl.create({
      component: ChangePasswordComponent
    });
    modal.present();
  }
}
