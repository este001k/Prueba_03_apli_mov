import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  firebaseSvc = inject(FirebaseService);
  utilSvc= inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise((resolve) =>{
      this.firebaseSvc.getAuth().onAuthStateChanged((auth)=>{
        if(!auth){
          resolve(true); //este guard esta al revez por ende es !auth y si esta este no se podrá devolver al login
        }
        else{
          this.utilSvc.routerLink('/qr-reg');
          resolve(false);  
        }
      })
    })

  }
}
