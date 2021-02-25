import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustommersPage } from './custommers.page';

const routes: Routes = [
  {
    path: '',
    component: CustommersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustommersPageRoutingModule {}
