import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenPaymentsPage } from './open-payments.page';

const routes: Routes = [
  {
    path: '',
    component: OpenPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenPaymentsPageRoutingModule {}
