import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersModalPage } from './members-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MembersModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersModalPageRoutingModule {}
