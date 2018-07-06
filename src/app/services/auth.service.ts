import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import  * as firebase from "firebase/app";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public _afAuth: AngularFireAuth) { }

  registerUser(object){

    return new Promise((resolve,reject)=>{
     
        this._afAuth.auth.createUserWithEmailAndPassword(object.email,object.passwd)
                          .then(
                            (success)=>{
                              let user: any = this._afAuth.auth.currentUser;
                              user.sendEmailVerification().then(
                                (success) =>{ 
                                  console.log('Verifica el correo');
                                  user.updateProfile({
                                    displayName: object.nombre
                                  });
                                }

                              ).catch(err => console.log(err));
                            }
                          ).catch((err) => console.log(err));
    });
  }

  loginUser(email:string, pass:string){
    console.log('Llamada a la función del servicio');
    return new Promise((resolve,reject)=>{
      console.log('Llamada a la promesa');
      this._afAuth.auth.signInWithEmailAndPassword(email,pass)
                       .then(userData => {
                         console.log('Llamada a la respuesta de la promesa nested');
                         console.log(userData);
                         if (userData.user.emailVerified){
                           console.log(' EL EMAIL ESTá a ', userData.user.emailVerified)
                          resolve(userData);
                         }
                       },
                       err => reject (err));
    });
  }

 getAuth(){

   return this._afAuth.authState.pipe(map(auth =>auth));
 }


  logout(){
    return this._afAuth.auth.signOut();
  }

  googleLogin(){
    return this._afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }

  facebookLogin(){
    return this._afAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider());
  }

  twitterLogin(){
    return this._afAuth.auth.signInWithPopup( new firebase.auth.TwitterAuthProvider());
  }

  sendVerification() {
    let user = this._afAuth.auth.currentUser;
    user.sendEmailVerification().then((success)=>success, err => err );
  }

}
