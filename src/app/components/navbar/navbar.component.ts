import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;

  constructor(private _authService:AuthService) { }

  ngOnInit() {
    this._authService.getAuth().subscribe( auth =>{
      if(auth){
         this.isLogin = true;
         this.nombreUsuario = auth.displayName;
         this.emailUsuario =auth.email;
      }else{
        this.isLogin = false;
      }
    });
  }


  logout(){
    this._authService.logout();
  }


}
