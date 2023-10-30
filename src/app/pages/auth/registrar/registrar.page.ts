import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    nombre: new FormControl('',[Validators.required,Validators.minLength(6)]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.registrar(this.form.value as User).then(async res=>{

        await this.firebaseSvc.actualizarUser(this.form.value.nombre);
  
        let uid= res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid); //funcion para guardar en la base de dato

      }).catch(error =>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 3000,
          color:'danger',
          position:'top',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      }) 
    }
  }

  async setUserInfo(uid:string){
    if(this.form.valid){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path='users/${uid}'; //donde se guardara 

      delete this.form.value.password; //no se envia la contraseña

      this.firebaseSvc.setDocument(path,this.form.value).then(async res=>{

        this.utilsSvc.saveLocalStorage('user',this.form.value);
        this.utilsSvc.routerLink('/qr-reg/ver-reg');
        this.form.reset();

      }).catch(error =>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 3000,
          color:'danger',
          position:'top',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      }) 
    }
  }
}
