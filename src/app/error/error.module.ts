import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorNetwork } from './error-network/error-network.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ErrorNetwork
  ],
  imports: [
    CommonModule,
    IonicModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
