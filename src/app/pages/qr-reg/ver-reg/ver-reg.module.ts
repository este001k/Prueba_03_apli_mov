import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRegPageRoutingModule } from './ver-reg-routing.module';

import { VerRegPage } from './ver-reg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRegPageRoutingModule
  ],
  declarations: [VerRegPage]
})
export class VerRegPageModule {}
