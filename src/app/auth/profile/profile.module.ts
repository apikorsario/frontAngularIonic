import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrCodeModule } from "ng-qrcode";
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { UserOptionComponent } from 'src/app/shared/popovers/user-option/user-option.component';
import { ChangePasswordComponent } from 'src/app/shared/modals/change-password/change-password.component';
import { AppIonModule } from 'src/app/shared/components/app-ion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AppIonModule,
    ProfilePageRoutingModule,
    QrCodeModule
  ],
  declarations: [
    ProfilePage, 
    UserOptionComponent,
    ChangePasswordComponent
  ]
})
export class ProfilePageModule {}
