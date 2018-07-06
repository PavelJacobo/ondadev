import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface Registro {
  nombre: string;
  email: string;
  passwd: string;
  foto?: string;
  programa: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
 
  public email: string;
  public nombre: string;
  public apellidos: string;
  public passwd: string;
  public programa: string;

  constructor(private _authService: AuthService,
              private _router: Router,
            ) {
              
              }

  ngOnInit() {
  }

  registerUser(){
   const datos: Registro = {
      nombre: `${this.nombre} ${this.apellidos}`,
      email: this.email,
      passwd: this.passwd,
      programa: this.programa
   }

   console.log(datos);
    this._authService.registerUser(datos)
                     .then((res)=>{
                       console.log('USUARIO REGISTRADO');
                       console.log(res);
                       this._router.navigate(['/admin']);
                     }).catch((err)=>{
                       console.log(err);
                     });
  }

}
