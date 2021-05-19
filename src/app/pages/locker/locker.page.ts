import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ILockerDetailReq } from 'src/app/shared/interfaces/requests/locker-detail-req';
import { ILockerDetailRes } from 'src/app/shared/interfaces/responses/locker-detail-res';
import { ILockerRes } from 'src/app/shared/interfaces/responses/locker-res';
import { ToastModel } from 'src/app/shared/models/toast.model';
import { LockerService } from 'src/app/shared/services/locker.service';
import { QrCodePage } from '../qr-code/qr-code.page';

@Component({
  selector: 'app-locker',
  templateUrl: './locker.page.html'
})
export class LockerPage implements OnInit {
  public locker: ILockerRes;
  public isLoad: boolean;
  public subscription: Subscription;

  constructor(
    private _lockerService: LockerService,
    private _loadingCtrl: LoadingController,
    private _modalCtrl: ModalController
  ) {
  }
  
  ngOnInit(): void {
    this.loadLocker();
  }

  async loadLocker() {
    this.isLoad = true;
    (await this._loadingCtrl.create()).present();
    this.subscription = this._lockerService.getLocker().subscribe(
      res => {
        this.locker = res.data
        this._loadingCtrl.dismiss();
        this.isLoad = false;
      },
      err => {
        this._loadingCtrl.dismiss();
        this.isLoad = false;
      }
    )
  }

  doRefresh($event?: CustomEvent) {
    this.subscription.unsubscribe();
    this._lockerService.getLocker().subscribe(
      res => {
        this.locker = res.data;
        $event?.detail.complete();
      },
      err => $event?.detail.complete()
    )
  }

  clickedRemoveDetail(detail: ILockerDetailRes, clickedDelete?: boolean) {
    var quantity = 1;
    var action = 'removing';
    if (clickedDelete) {
      quantity = detail.quantity;
      action = 'deleting';
    }
    let body = { productId: detail.product.productId, quantity }

    this.startAction(detail, action);
    this._lockerService.removeDetailsToLocker(body).subscribe(
      () => {
        this.doRefresh();
        this.finishAction(detail, action);
        ToastModel.showSuccess(`se ${clickedDelete ? 'eliminó' : 'removio 1'}  de tu casillero`)
      },
      err => {
        this.finishAction(detail, action);
      },
    )
  }

  clickedAddDetail(detail: ILockerDetailRes) {
    if (detail.quantity == 6)
      return ToastModel.showError('lo siento alcanzaste el limited permitido');

    let quantity = 1;
    let body: ILockerDetailReq = {
      productId: detail.product.productId,
      quantity
    }

    this.startAction(detail, 'adding');
    this._lockerService.addDetailsToLocker(body).subscribe(
      () => {
        this.doRefresh();
        this.finishAction(detail, 'adding');
        ToastModel.showSuccess(`se ${quantity == detail.quantity ? 'eliminó' : 'removio 1'}  de tu casillero`)
      },
      err => {
        this.finishAction(detail, 'adding');
        ToastModel.showError('lo sentimos! este producto se encuentra agotado');
      }
    )
  }

  startAction(detail: ILockerDetailRes, action: string) {
    detail[action] = true;
  }

  finishAction(detail: ILockerDetailRes, action: string) {
    setTimeout(() => {
      detail[action] = false;
    }, 300);
  }

  async clickedQrCode(){
    let modal = await this._modalCtrl.create({
      component: QrCodePage,
      componentProps: {openFromModal: true}
    });
    modal.present();
  }

}
