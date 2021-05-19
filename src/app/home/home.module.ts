import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { PopoverModule } from '../shared/popovers/popover.module';
import { PipeModule } from '../shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PopoverModule,
    PipeModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
