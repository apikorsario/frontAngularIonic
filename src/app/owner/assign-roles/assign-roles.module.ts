import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssignRolesPageRoutingModule } from './assign-roles-routing.module';
import { AssignRolesPage } from './assign-roles.page';
import { UserRoleComponent } from 'src/app/shared/modals/user-role/user-role.component';
import { AppIonModule } from 'src/app/shared/components/app-ion.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AppIonModule,
    AssignRolesPageRoutingModule
  ],
  declarations: [
    AssignRolesPage,
    UserRoleComponent
  ]
})
export class AssignRolesPageModule {}
