import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string;
  public password:string;
  public emailVerified: boolean;
  public autorizado: boolean;

  constructor(private _authService: AuthService,
              private _router: Router ) { }

  ngOnInit() {
    this._authService.getAuth().subscribe((auth) => {
      if (auth){
        this.autorizado = true;
        console.log ('auth ', auth);
        console.log ( 'EMAIL VERIFIED ', auth.emailVerified);
        this.emailVerified = auth.emailVerified;
      }
      
    });
  }

  loginUser(){
    console.log('Llamada a la función');
    this._authService.loginUser(this.email, this.password)
                     .then((res)=>{
                       console.log('Respuesta: :::', res);
                       this._router.navigate(['/administrador']);
                     }).catch((err)=>{
                       console.log(err);
                        this._router.navigate(['/login']);
                     });
  }

  googleLogin(){

    this._authService.googleLogin()
                     .then((res)=>{
                       this._router.navigate(['/administrador']);
                     }).catch(err => console.log(err));
  }

  facebookLogin(){
    this._authService.facebookLogin()
                     .then((res)=>{
                       this._router.navigate(['/administrador']);
                     }).catch( err => console.log(err.message));
  }

  twitterLogin(){
    this._authService.twitterLogin()
                     .then((res)=>{
                       this._router.navigate(['administrador']);
                     }).catch(err => console.log(err.message));
  }

  sendVerification() {
    this._authService.sendVerification()
  }
}
