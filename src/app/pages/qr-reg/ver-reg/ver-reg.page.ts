import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-ver-reg',
  templateUrl: './ver-reg.page.html',
  styleUrls: ['./ver-reg.page.scss'],
})
export class VerRegPage implements OnInit {

  
  form = new FormGroup({
    seccion: new FormControl('',Validators.required),
    asignatura: new FormControl('',Validators.required),
    rut: new FormControl('',Validators.required)
  })

  latitud : number | undefined;
  longitud : number | undefined;
  imagenes:any[]=[];

  constructor (private auth:AngularFireAuth , private firestore:AngularFirestore,private alertController: AlertController){}


  ngOnInit()  {
    defineCustomElements(window);
  }


  async submit(){
    const user = await this.auth.currentUser;
    if (user){
      const userId = user.uid ;
      const {seccion , asignatura , rut} = this.form.value;
      const cord = await Geolocation.getCurrentPosition();
      this.latitud=cord.coords.latitude;
      const latituud = this.latitud.toFixed(2);
      this.longitud=cord.coords.longitude;
      const longitudd = this.latitud.toFixed(2);
      //creacion de boton para verificar que se guardo todo 
      const alert = await this.alertController.create({
        header: 'información',
        message: 'SE HA GUARDADO EXITOSAMENTE LA ASISTENCIA',
        buttons: ['CERRAR']
      });

      this.firestore.collection('users').doc(userId).set({
        seccion,
        asignatura,
        rut,
        latituud,
        longitudd
      });
      localStorage.setItem('user', JSON.stringify({seccion,asignatura,rut,latituud,longitudd}));
      await alert.present();

    }
  }

  async takeFoto(){

    var cSourse = CameraSource.Prompt;

    if ((await Camera.checkPermissions()).camera == 'granted') {
      const image = await Camera.getPhoto(
        {
          resultType:CameraResultType.Uri,
          quality:100,
          height:1024,
          width:1024,
          source:cSourse,
          presentationStyle:'popover',
          promptLabelCancel:"Cancelar",
          promptLabelHeader:"elija el tipo de foto ",
          promptLabelPhoto:"Buscar de la galeria",
          promptLabelPicture:"Tomar foto"
        }
        );

        if (image.webPath) {
          var blob = (await fetch(image.webPath)).blob();
          this.imagenes.unshift({fname:'foto.'+ image.format,src:image.webPath,file:blob});
        }

        console.log("IMAGENES GUARDADAS ===> ", this.imagenes);
        


    }
  }




  

}
