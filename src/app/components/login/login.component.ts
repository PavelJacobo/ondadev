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

  constructor(private _authService: AuthService,
              private _router: Router ) { }

  ngOnInit() {
  }

  loginUser(){
    this._authService.loginUser(this.email, this.password)
                     .then((res)=>{
                       console.log(res);
                       this._router.navigate(['/administrador']);
                     }).catch((err)=>{
                       console.log(err);
                        this._router.navigate(['/login']);
                     })
  }
}
