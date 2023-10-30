import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrRegPage } from './qr-reg.page';

const routes: Routes = [
  {
    path: '',
    component: QrRegPage
  },
  {
    path: 'ver-reg',
    loadChildren: () => import('./ver-reg/ver-reg.module').then( m => m.VerRegPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrRegPageRoutingModule {}
