import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public email: string;
  public passwd: string;


  constructor(private _authService: AuthService,
              private _router: Router,
            ) {

              }

  ngOnInit() {
  }

  registerUser(){
    this._authService.registerUser(this.email, this.passwd)
                     .then((res)=>{
                       console.log('USUARIO REGISTRADO');
                       console.log(res);
                       this._router.navigate(['/admin']);
                     }).catch((err)=>{
                       console.log(err);
                     })
  }

}
