import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NoticiasService } from '../../../../services/noticias.service';
import { Noticias } from '../../../../models/noticias';
import { Router } from '@angular/router';
import { SubirImagenService } from '../../../../services/subir-imagen.service';
//
import * as firebase from 'firebase';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from '@firebase/util';



@Component({
  selector: 'app-noticias-admin',
  templateUrl: './noticias-admin.component.html',
  styleUrls: ['./noticias-admin.component.css']
})
export class NoticiasAdminComponent implements OnInit {


  public nombreUsuario:string;
  public idUsuario:string;
  public imagen:string;
  public contenido:string;
  public titulo:string;
  public labelfoto:string = 'Subir Imagen';

  noticia: Noticias = {
    id: '',
    titulo: '',
    contenido: '',
    nombreUsuario: '',
    idUsuario: '',
    imagen:'',
    fecha: null
  }

  constructor(private _authService:AuthService,
              private _noticiasService: NoticiasService,
              private _router: Router,
              private _upload: SubirImagenService,
              ) {


  }

  ngOnInit() {

    this._authService.getAuth().subscribe( auth =>{
      if(auth){

         this.nombreUsuario = auth.displayName;
         this.idUsuario = auth.uid;
        console.log(this.nombreUsuario, this.idUsuario);
      }
    });


  }
  addNoticia({value}: {value: Noticias}){
    console.log(value);
    /* let obj = new Date();
    let objA = obj.getUTCFullYear();
    let objM = obj.getUTCMonth();
    let objD = obj.getUTCDate();
    let objH = obj.getUTCHours();
    let objMn = this.getMinutesWithZero(obj);
    let objS = this.getSecundesWithZero(obj);
    value.id_content = Number(`${objA}${objM}${objD}${objH}${objMn}${objS}`);
    value.fecha = new Date().toString();

    this._noticiasService.addNoticia(value);
    this._router.navigate(['/home']); */

  }

  getMinutesWithZero(obj){
    return (obj.getMinutes() < 10 ? '0' : '') + obj.getMinutes();
  }

  getSecundesWithZero(obj){
    return (obj.getSeconds() < 10 ? '0' : '') + obj.getSeconds();
  }

  onSubirFoto( imagen ){



    if ( imagen ) {
      this.labelfoto = imagen.target.value.replace(/^.*[\\\/]/, '');
    }

      this._upload.upload(imagen, this.labelfoto);


  }
}

// .replace(/^.*[\\\/]/, '');
