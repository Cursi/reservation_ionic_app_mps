import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembersModalPageRoutingModule } from './members-modal-routing.module';

import { MembersModalPage } from './members-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembersModalPageRoutingModule
  ],
  declarations: [MembersModalPage]
})
export class MembersModalPageModule {}
