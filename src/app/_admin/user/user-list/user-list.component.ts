import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { IUserRes } from 'src/app/shared/interfaces/responses/user-res';
import { AdminUsersService } from 'src/app/shared/services/admin/admin-users.service';
import { UserOptionsComponent } from '../user-options/user-options.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  public users: Array<IUserRes>;

  constructor(
    private _adminUserService: AdminUsersService,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
    private _modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    (await this._loadingCtrl.create()).present();
    this._adminUserService.getUsers().subscribe(
      res => {
        this.users = res.data;
        this._loadingCtrl.dismiss();
      },
      err => {
        this._loadingCtrl.dismiss();
        this._navCtrl.navigateRoot('/');
      }
    )
  }

  doRefresh(event: CustomEvent) {
    this._adminUserService.getUsers().subscribe(
      res => {
        this.users = res.data;
        event.detail.complete();
      },
      err => {
        event.detail.complete();
        this._navCtrl.navigateRoot('/');
      }
    )
  }

  async clickedUser(user: IUserRes) {
    let modal = await this._modalCtrl.create({
      component: UserOptionsComponent,
      componentProps: { user }
    });
    modal.present();
    let res = await modal.onWillDismiss();
    if (res.role == 'invoices') {
      this._navCtrl.navigateForward(`/auth/admin/users/invoices/${user.userId}`);
    }
  }
}
