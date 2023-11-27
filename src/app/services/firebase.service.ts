import { Injectable,inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,updateProfile,sendPasswordResetEmail} from 'firebase/auth';
import { User } from '../models/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {getFirestore,setDoc,doc, getDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

 auth = inject (AngularFireAuth);
 firestore = inject (AngularFirestore);
 utilsSvc = inject(UtilsService);
 


 login(user : User){
  return signInWithEmailAndPassword(getAuth(),user.email,user.password);
 }

 registrar(user : User){
  return createUserWithEmailAndPassword(getAuth(),user.email,user.password);
 }

 actualizarUser(displayName: string){
  return updateProfile (getAuth().currentUser, {displayName});
 }

 sendRecoveryEmail(email: string){
  return sendPasswordResetEmail(getAuth(),email)
 }

 //cerrar sesion de usuario
 cerrarSesion(){
  getAuth().signOut();
  localStorage.removeItem('user');
  this.utilsSvc.routerLink('/auth');
 }

 //autenticacion para los route guards
 getAuth(){
  return getAuth();
 }

 //base de dato
 setDocument(path:string, data :any ){
  return setDoc(doc(getFirestore(),path),data);
 }

 async getDocument(path:string){
  return (await getDoc(doc(getFirestore(),path))).data();
 }
 
}
