import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { IonicModule } from '@ionic/angular';
import { AppIonModule } from 'src/app/shared/components/app-ion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppPipeModule } from 'src/app/shared/pipes/app-pipe.module';
import { UserOptionsComponent } from './user-options/user-options.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserOptionsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AppIonModule,
    UserRoutingModule,
    AppPipeModule
  ]
})
export class UserModule { }
