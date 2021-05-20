import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GravatarService } from '@infinitycube/gravatar';
import { LoadingController } from '@ionic/angular';
import { IUserRes } from '../../interfaces/responses/user-res';
import { AdminUsersService } from '../../services/admin/admin-users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  public users: Array<IUserRes>;

  @Output() $click: EventEmitter<IUserRes>;

  constructor(
    private _adminUserService: AdminUsersService,
    private _loadingCtrl: LoadingController,
    private _gravatarService: GravatarService
  ) {
    this.$click = new EventEmitter<IUserRes>();
  }
  
  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    (await this._loadingCtrl.create()).present();
    this._adminUserService.getUsers().subscribe(
      res => {
        this.users = res.data;
        this.users.map(u => u.avatar = this._gravatarService.url(u.email, 100, 'wavatar'))
        this._loadingCtrl.dismiss();
        console.log(res);
      },
      err => {
        this._loadingCtrl.dismiss();
      }
    )
  }

  clickedUser(user: IUserRes) {
    this.$click.emit(user);
  }

}
