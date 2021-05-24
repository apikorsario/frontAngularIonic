import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { IUserRes } from 'src/app/shared/interfaces/responses/user-res';
import { AdminUsersService } from 'src/app/shared/services/admin/admin-users.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html'
})
export class SearchUserComponent implements OnInit {

  public users: Array<IUserRes>;
  public search: string;

  constructor(
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _adminUserService: AdminUsersService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }
  
  async loadUsers() {
    (await this._loadingCtrl.create()).present();

    this._adminUserService.getUsers().subscribe(
      res => {
        this._loadingCtrl.dismiss();
        this.users = res.data;
      },
      err => {
        this._loadingCtrl.dismiss();
        this.closeModal();
      }
    )
  }

  closeModal(user?: IUserRes) {
    this._modalCtrl.dismiss(user, user ? 'ok' : 'cancel');
  }

}
