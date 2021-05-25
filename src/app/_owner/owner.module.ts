import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppIonModule } from '../shared/components/app-ion.module';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { AppPipeModule } from '../shared/pipes/app-pipe.module';


@NgModule({
  declarations: [
    AssignRoleComponent,
    UserRoleComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AppIonModule,
    AppPipeModule
  ]
})
export class OwnerModule { }
