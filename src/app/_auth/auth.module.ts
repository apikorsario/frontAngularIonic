import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppIonModule } from '../shared/components/app-ion.module';
import { ProfileComponent } from './profile/profile.component';
import { LockerComponent } from './locker/locker.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { QrCodeModule } from 'ng-qrcode';


@NgModule({
  declarations: [
    ProfileComponent,
    LockerComponent,
    QrCodeComponent,
    InvoiceComponent
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
