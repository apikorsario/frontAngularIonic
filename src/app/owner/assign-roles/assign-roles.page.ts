import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { IUserRes } from 'src/app/shared/interfaces/responses/user-res';
import { UserRoleComponent } from 'src/app/shared/modals/user-role/user-role.component';
import { AdminUsersService } from 'src/app/shared/services/admin/admin-users.service';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.page.html'
})
export class AssignRolesPage implements OnInit {

  public users: Array<IUserRes>;

  constructor(
    private _adminUsersService: AdminUsersService,
    private _loadingCtrl: LoadingController,
    private _modalCtrl: ModalController
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  
  async loadUsers() {
    (await this._loadingCtrl.create()).present();

    this._adminUsersService.getUsers().subscribe(
      res => {
        this.users = res.data;
        this._loadingCtrl.dismiss();
      },
      err => {
        console.log(err);
        this._loadingCtrl.dismiss();
      }
    )  
  }

  async clickedUser(user: IUserRes) {
    let modal = await this._modalCtrl.create({
      component: UserRoleComponent,
      componentProps: { user }
    });
    modal.present();
  }
}
