import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeGuard } from '../shared/guards/employee.guard';
import { OwnerGuard } from '../shared/guards/owner.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'locker',
    loadChildren: () => import('./locker/locker.module').then(m => m.LockerPageModule)
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesPageModule)
  },
  {
    path: 'qr-code',
    loadChildren: () => import('./qr-code/qr-code.module').then(m => m.QrCodePageModule)
  },
  {
    path: 'admin',
    canActivate: [EmployeeGuard],
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'owner',
    canActivate: [OwnerGuard],
    loadChildren: () => import('../owner/owner.module').then(m => m.OwnerModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
