import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  public fotoUsuario: string;

  constructor(private _authService:AuthService,
              private _router:Router) { }

  ngOnInit() {
    this._authService.getAuth().subscribe( auth =>{
      if(auth){
         this.isLogin = true;
         this.nombreUsuario = auth.displayName;
         this.emailUsuario = auth.email;
         this.fotoUsuario = auth.photoURL;
      }else{
        this.isLogin = false;
      }
    });
  }


  logout(){
    this._authService.logout();
    this._router.navigate(['/home']);
  }


}
