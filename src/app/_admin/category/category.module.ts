import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppIonModule } from 'src/app/shared/components/app-ion.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from 'src/app/_admin/category/category-edit/category-edit.component';
import { AppPipeModule } from 'src/app/shared/pipes/app-pipe.module';


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
    AppPipeModule
  ]
})
export class CategoryModule { }
