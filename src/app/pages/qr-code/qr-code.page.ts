import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { IUserRes } from 'src/app/shared/interfaces/responses/user-res';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html'
})
export class QrCodePage implements OnInit {
  @Input() openFromModal: boolean;
  public user: IUserRes;

  constructor(
    private _userService: UserService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadUser();
  }
  
  async loadUser(){
    (await this._loadingCtrl.create()).present();
    this._userService.getProfile().subscribe(
      res => {
        this.user = res.data;
        this._loadingCtrl.dismiss();
      },
      err => {
        this._loadingCtrl.dismiss();
      }
    )
  }

  closeModal() {
    this._modalCtrl.dismiss();
  }
}
