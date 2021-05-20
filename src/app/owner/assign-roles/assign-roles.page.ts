import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUserRes } from 'src/app/shared/interfaces/responses/user-res';
import { UserRoleComponent } from 'src/app/shared/modals/user-role/user-role.component';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.page.html'
})
export class AssignRolesPage implements OnInit {

  constructor(
    private _modalCtrl: ModalController
  ) { }

  ngOnInit(): void {
  }

  async clickedUser(user: IUserRes) {
    let modal = await this._modalCtrl.create({
      component: UserRoleComponent,
      componentProps: { user }
    });
    modal.present();
  }
}
