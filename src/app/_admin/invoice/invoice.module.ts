import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchUserComponent } from './search-user/search-user.component';
import { AppIonModule } from 'src/app/shared/components/app-ion.module';
import { AppPipeModule } from 'src/app/shared/pipes/app-pipe.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceCreateComponent,
    InvoiceDetailComponent,
    SearchUserComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    InvoiceRoutingModule,
    AppIonModule,
    AppPipeModule
  ]
})
export class InvoiceModule { }
