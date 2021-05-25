import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppIonModule } from '../shared/components/app-ion.module';
import { ProfileComponent } from './profile/profile.component';
import { LockerComponent } from './locker/locker.component';
import { QrCodeModule } from 'ng-qrcode';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { UserOptionComponent } from '../shared/popovers/user-option/user-option.component';
import { ChangePasswordComponent } from '../shared/modals/change-password/change-password.component';


@NgModule({
  declarations: [
    ProfileComponent,
    LockerComponent,
    QrCodeComponent,
    InvoiceComponent,
    UserOptionComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AppIonModule,
    QrCodeModule
  ]
})
export class AuthModule { }
