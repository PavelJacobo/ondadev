import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Noticias } from '../../models/noticias';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

    public idNoticia: string;
    public labelfoto: string;
    public id_foto: string;
    public noticia: Noticias = {
      id: '',
      titulo: '',
      idUsuario: '',
      nombreUsuario: '',
      contenido: '',
      fecha: '',
      imagen: '',
      nombre_imagen: '',
    };

  constructor(

            private _router: Router,
            private _noticiaService: NoticiasService,
            private _imageService: ImagenService,
            private activateRoute: ActivatedRoute,
  ) {


   }

  ngOnInit() {

    this.getDetalleNoticia();
  }

  getDetalleNoticia() {

    this.idNoticia = this.activateRoute.snapshot.params['id'];
    console.log('PARAMETRO ', this.idNoticia);
    this._noticiaService.getNoticia(this.idNoticia).subscribe(noticia => {
      if (noticia) {

          this.noticia = noticia;
          this.noticia.imagen = noticia.imagen;

    }
    });
  }

  updateNoticia({value}: {value: Noticias}) {
          value.id = this.idNoticia;
          value.imagen = this.noticia.imagen;
          console.log(value);
          this._noticiaService.updateNoticia(value);
          this._router.navigate(['/detalle/' + this.idNoticia]);
  }

  deleteImagen(id_imagen) {

    if (confirm('Estás Seguro que deseas eliminar la imagen?')) {
      id_imagen = this.noticia.nombre_imagen;
      this._imageService.deleteImage(id_imagen);
      this.noticia.imagen = '';

    }


  }

  onSubirFoto( imagen ) {


    if ( imagen ) {
      this.labelfoto = imagen.target.value.replace(/^.*[\\\/]/, '');
      this.id_foto = `_${this.noticia.nombreUsuario}_${this.noticia.idUsuario}_${this.labelfoto}`;
    }

      this._imageService.uploadImage(imagen, this.id_foto).then((data: any) =>
      { this.noticia.imagen = data })
      .catch((err) => console.error(err));

    }

    confirmarCancelar(event) {
      if (confirm('¿Estás Seguro? Los cambios no se ejecutarán salvo que hayas eliminado la imagen, en ese caso deberás subirla otra vez'))
      {
        this._router.navigate(['/home']);
      }
      event.preventDefault();
    }
}
