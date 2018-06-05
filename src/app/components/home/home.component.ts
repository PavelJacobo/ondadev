import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Noticias } from '../../models/noticias';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public noticias:Noticias[];
  constructor( private _noticiasService: NoticiasService) { }

  ngOnInit() {

    this._noticiasService.getNoticias().subscribe((res)=>{
      console.log(res);
      this.noticias = res;
    });
  }

}
