import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toatsCtrl = inject(ToastController);
  router = inject(Router);


  loading(){
    return this.loadingCtrl.create({spinner:'crescent'})
  }


  async presentToast(opts?: ToastOptions) {
    const toast = await this.toatsCtrl.create(opts);
    toast.present();
  }

  routerLink(url:string){
    return this.router.navigateByUrl(url);
  }

  saveLocalStorage(key:string , value: any){
    return localStorage.setItem(key,JSON.stringify(value))
  }

  getFromLocalStorage(key :string){
    return JSON.parse(localStorage.getItem(key))
  }
}
