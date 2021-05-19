import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { PopoverModule } from 'src/app/shared/popovers/popover.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    PopoverModule,
    PipeModule,
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
