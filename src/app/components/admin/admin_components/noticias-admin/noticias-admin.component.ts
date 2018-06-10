import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NoticiasService } from '../../../../services/noticias.service';
import { Noticias } from '../../../../models/noticias';
import { Router } from '@angular/router';
import { ImagenService } from '../../../../services/imagen.service';
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


  public nombreUsuario: string;
  public idUsuario: string;
  public labelfoto: string;
  public id_foto: string;
  noticia: Noticias = {
    id: '',
    titulo: '',
    contenido: '',
    nombreUsuario: '',
    idUsuario: '',
    imagen: '',
    nombre_imagen: '',
    fecha: null
  };

  constructor(private _authService: AuthService,
              private _noticiasService: NoticiasService,
              private _router: Router,
              private _imageService: ImagenService,
              ) {

          this.labelfoto = 'Subir Imagen';

  }

  ngOnInit() {



    this._authService.getAuth().subscribe( auth => {
      if ( auth ) {

         this.nombreUsuario = auth.displayName;
         this.idUsuario = auth.uid;
        console.log(this.nombreUsuario, this.idUsuario);
      }
    });


  }
  addNoticia({value}: {value: Noticias}) {

     const obj = new Date();
     const objA = obj.getUTCFullYear();
     const objM = this.getMonthWithZero(obj);
     const objD = this.getDateWithZero(obj);
     const objH = this.getHoursWithZero(obj);
     const objMn = this.getMinutesWithZero(obj);
     const objS = this.getSecundesWithZero(obj);
     value.id_content = Number(`${objA}${objM}${objD}${objH}${objMn}${objS}`);
     value.fecha = new Date().toString();
     value.imagen = this._imageService.url;
     value.nombre_imagen = this._imageService.nombre;
     console.log(value);
     this._noticiasService.addNoticia(value);
     this._router.navigate(['/home']);
     this._imageService.url = '';

  }

  getHoursWithZero(obj) {
    return (obj.getUTCHours() < 10 ? '0' : '') + obj.getUTCHours();
  }
  getMinutesWithZero(obj) {
    return (obj.getMinutes() < 10 ? '0' : '') + obj.getMinutes();
  }
  getSecundesWithZero(obj) {
    return (obj.getSeconds() < 10 ? '0' : '') + obj.getSeconds();
  }
  getDateWithZero(obj) {
    return (obj.getUTCDate() < 10 ? '0' : '') + obj.getUTCDate();
  }
  getMonthWithZero(obj) {
    return (obj.getUTCMonth() < 10 ? '0' : '') + obj.getUTCMonth();
  }

  onSubirFoto( imagen ) {


    if ( imagen ) {
      this.labelfoto = imagen.target.value.replace(/^.*[\\\/]/, '');
      this.id_foto = `_${this.nombreUsuario}_${this.idUsuario}_${this.labelfoto}`;
    }

      this._imageService.uploadImage(imagen, this.id_foto);


  }

  deleteImagen(id_imagen: string) {
    if(confirm('Estás seguro que deseas eliminar la imagen?')) {
      id_imagen = this.id_foto;
      this._imageService.deleteImage(id_imagen);

      this._imageService.url = '';
      this._imageService.nombre = '';
      this.labelfoto = '';
    }


  }
}

// .replace(/^.*[\\\/]/, '');
