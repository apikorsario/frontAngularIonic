import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorNetwork } from './error-network/error-network.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'network',
    pathMatch: 'full'
  },
  {
    path: 'network',
    component: ErrorNetwork
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
