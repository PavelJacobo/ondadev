import { NoticiasService } from './../../services/noticias.service';
import { Noticias } from './../../models/noticias';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit {

  idNoticia: string;
  idUserlogged: string;
  isOwner: boolean;
  noticia: Noticias;

  constructor( private _noticiaService: NoticiasService,
              private _authService: AuthService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private imageService: ImagenService) {
              this.isOwner = false;
               }

  ngOnInit() {
    this.comprobarUserLogin();
    this.getDetalleNoticia();
  }

  comprobarUserLogin() {
    this._authService.getAuth().subscribe(user => {
        if ( user ) {
          this.idUserlogged = user.uid;
        }
    });
  }

  getDetalleNoticia() {
    this.idNoticia = this.activateRoute.snapshot.params['id'];
    console.log('PARAMETRO ', this.idNoticia);
    this._noticiaService.getNoticia(this.idNoticia).subscribe(noticia => {
      if (noticia){

          this.noticia = noticia;
          if ( this.idUserlogged === this.noticia.idUsuario) {
              this.isOwner = true;
          }
    }
    });
  }

  deleteNoticia() {
        if (confirm('Estás Seguro')) {
          this._noticiaService.deleteNoticia(this.noticia);
          this.imageService.deleteImage(this.noticia.nombre_imagen);
          this.router.navigate(['/home']);
        }
  }

}
