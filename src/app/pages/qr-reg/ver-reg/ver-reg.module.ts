import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRegPageRoutingModule } from './ver-reg-routing.module';

import { VerRegPage } from './ver-reg.page';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRegPageRoutingModule,
    ShareModule
  ],
  declarations: [VerRegPage]
})
export class VerRegPageModule {}
