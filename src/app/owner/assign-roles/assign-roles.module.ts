import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssignRolesPageRoutingModule } from './assign-roles-routing.module';
import { AssignRolesPage } from './assign-roles.page';
import { UserListModule } from 'src/app/shared/modules/user-list/user-list.module';
import { UserRoleComponent } from 'src/app/shared/modals/user-role/user-role.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AssignRolesPageRoutingModule,
    UserListModule
  ],
  declarations: [
    AssignRolesPage,
    UserRoleComponent
  ]
})
export class AssignRolesPageModule {}
