import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppIonModule } from 'src/app/shared/components/app-ion.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from 'src/app/admin/category/category-edit/category-edit.component';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AppIonModule,
    CategoryRoutingModule,
    PipeModule
  ]
})
export class CategoryModule { }
