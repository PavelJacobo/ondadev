import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { Profile } from 'src/app/interfaces/profile';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id_foto: string;
  labelfoto: any;
  public nombre: string;
  public programa: string;
  public email: string;
  public imagen: string;
  public idUserlogged: string;
  public profile: Profile= {
                          nombre: this.nombre,
                          programa: this.programa,
                          email: this.email,
                          id: this.idUserlogged,
                          imagen: this.imagen,
                          id_content: ''
                        };

  constructor(private _authService: AuthService,
              private _imageService: ImagenService,
              private _router: Router,
              private _dbService: DatabaseService) {

              }

  ngOnInit() {
    this.comprobarUserLogin();
  }



  comprobarUserLogin() {
    this._authService.getAuth().subscribe(user => {
        if ( user ) {
          // console.log('USUARIO ', user);
          this.profile.nombre = user.displayName;
          this.profile.id = user.uid;
          this.profile.email = user.email;
          this.profile.imagen = user.photoURL;
          this._dbService.getUserProfile(user.uid).subscribe(id => {
            id.forEach(doc => {
              console.log(doc);
              this.profile.id_content = doc.id_content;
              this.profile.programa = doc.programa;
            });
          });
          // console.log('el get USER ESTE ', this.profile.id_content);
          // console.log(this.profile);
        }
    });
  }


  onSubirFoto( imagen ) {


    if ( imagen ) {
      this.labelfoto = imagen.target.value.replace(/^.*[\\\/]/, '');
      this.id_foto = `_${this.profile.nombre}_${this.profile.id}_${this.labelfoto}`;
    }

      this._imageService.uploadUserImage(imagen, this.id_foto).then((data: any) =>
      { this.profile.imagen = data })
      .catch((err) => console.error(err));

    }

    confirmarCancelar(event) {
      if (confirm('¿Estás Seguro? Los cambios no se ejecutarán salvo que hayas eliminado la imagen, en ese caso deberás subirla otra vez'))
      {
        this._router.navigate(['/home']);
      }
      event.preventDefault();
    }

    deleteImagen() {

      if (confirm('Estás Seguro que deseas eliminar la imagen?')) {
        const id_imagen = `_${this.profile.nombre}_${this.profile.id}_${this.labelfoto}`;
        this._imageService.deleteUserImage(id_imagen);
        this.profile.imagen = '';

      }


    }

    updateUser({value}: {value: Profile}){
      value.id = this.profile.id;
      value.imagen = this.profile.imagen;
      value.email = this.profile.email;
      value.id_content = this.profile.id_content;
      this._authService.updateUser(value);
    }

}
