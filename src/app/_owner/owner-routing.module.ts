import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignRoleComponent } from './assign-role/assign-role.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'assign-roles',
    pathMatch: 'full'
  },
  {
    path: 'assign-roles',
    component: AssignRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
