import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeGuard } from '../shared/guards/employee.guard';

const routes: Routes = [
  {
    path: 'product-create',
    loadChildren: () => import('./product-create/product-create.module').then( m => m.ProductCreatePageModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
