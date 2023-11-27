import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';



@Component({
  selector: 'app-qr-reg',
  templateUrl: './qr-reg.page.html',
  styleUrls: ['./qr-reg.page.scss'],
})
export class QrRegPage implements OnInit {

  //se copia el inject de los guards para usar las funciones del service
  firebaseSvc = inject(FirebaseService);
  utilSvc= inject(UtilsService);

  constructor( private router: Router) { }

  
  ngOnInit() {
  }

  cerrarSesion(){
    this.firebaseSvc.cerrarSesion();
  }

  async startScanner() {
    try{
      const permission= await this.checkPermission();
      if(!permission){
        return;
      }
      await BarcodeScanner.hideBackground();
      
      const result = await BarcodeScanner.startScan();
      console.log(result);
      if(result?.hasContent){
        this.router.navigate(['qr-reg/ver-reg']);
        BarcodeScanner.showBackground();

      }
    }catch(e){
      console.log(e);
      this.stopScanner();
      
    } 
  }

  async checkPermission(){
      const status = await BarcodeScanner.checkPermission({force:true});
      if (status.granted){
        return true;
      }
      return false;
  }

  stopScanner(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
  
  

}
