import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeGuard } from '../shared/guards/employee.guard';
import { OwnerGuard } from '../shared/guards/owner.guard';
import { InvoiceComponent } from './invoice/invoice.component';
import { LockerComponent } from './locker/locker.component';
import { ProfileComponent } from './profile/profile.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'locker',
    component: LockerComponent
  },
  {
    path: 'invoices',
    component: InvoiceComponent
  },
  {
    path: 'qr-code',
    component: QrCodeComponent
  },
  {
    path: 'admin',
    canActivate: [EmployeeGuard],
    loadChildren: () => import('../_admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'owner',
    canActivate: [OwnerGuard],
    loadChildren: () => import('../_owner/owner.module').then(m => m.OwnerModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
