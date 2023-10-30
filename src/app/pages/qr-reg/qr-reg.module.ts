import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrRegPageRoutingModule } from './qr-reg-routing.module';

import { QrRegPage } from './qr-reg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrRegPageRoutingModule
  ],
  declarations: [QrRegPage]
})
export class QrRegPageModule {}
