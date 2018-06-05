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

  registerUser(email:string, pass:string){
    return new Promise((resolve,reject)=>{
      this._afAuth.auth.createUserWithEmailAndPassword(email,pass)
                       .then(userData => resolve(userData),
                             err => reject (err));
    });
  }

  loginUser(email:string, pass:string){
    return new Promise((resolve,reject)=>{
      this._afAuth.auth.signInWithEmailAndPassword(email,pass)
                       .then(userData => resolve(userData),
                             err => reject (err));
    });
  }

 getAuth(){
   return this._afAuth.authState.pipe(map(auth => auth))
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

}
