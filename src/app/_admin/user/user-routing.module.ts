import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInvoiceComponent } from './user-invoice/user-invoice.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: UserListComponent
  },
  {
    path: 'invoices/:userId',
    component: UserInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
