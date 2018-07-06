import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public nombre: string;
  public programa: string;
  public imagen: string;

  constructor(private _authService: AuthService) { }

  ngOnInit() {

    this._authService.getAuth().subscribe((auth)=>{
      if (auth){
        this.nombre = auth.displayName;
      }
    });
  }

}
