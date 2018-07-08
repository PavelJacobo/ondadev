import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { map } from 'rxjs/internal/operators/map';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;
  private CARPETA_IMAGENES = 'img/';
  public url: string;
  public nombre: string;

  private userProfileImage = 'userImg/';

  constructor(private storage: AngularFireStorage,
            private db: AngularFirestore) { }


  uploadImage ( imagen, nombre ) {


      return new Promise((resolve,reject) => {
        this.nombre = nombre;
        const file = imagen.target.files[0];
        const filePath = `${ this.CARPETA_IMAGENES}/${ nombre }`;
        const  fileRef = this.storage.ref(filePath);
        const task =  fileRef.put(file);
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe( finalize(() => {

                            this.downloadURL = fileRef.getDownloadURL() ;
                            this.downloadURL.subscribe((data) => {
                              this.url = data;
                              console.log ('EL DATO ES: ', data);
                              resolve(this.url);
                              this.guardarImagen({
                                nombre: this.nombre,
                                url: this.url
                                });
                             });
                           })).subscribe();
      });








  }


  deleteImage(imagen) {
    const storageRef = firebase.storage().ref();
    const desertRef = storageRef.child( `${ this.CARPETA_IMAGENES }/${ imagen}` );
    desertRef.delete().then(() => {
        console.log('Archivo Eliminado');
    }).catch((err) =>  console.log(err.message));
    this.uploadPercent = undefined;
    this.downloadURL = null;

  }




  private guardarImagen( imagen: { nombre: string, url: string} ) {
    this.db.collection(`/${ this.CARPETA_IMAGENES }`)
           .add(imagen);
  }

  // Profile Upload Image

  uploadUserImage ( imagen, nombre ) {


    return new Promise((resolve,reject) => {
      this.nombre = nombre;
      const file = imagen.target.files[0];
      const filePath = `${ this.userProfileImage}/${ nombre }`;
      const  fileRef = this.storage.ref(filePath);
      const task =  fileRef.put(file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe( finalize(() => {

                          this.downloadURL = fileRef.getDownloadURL() ;
                          this.downloadURL.subscribe((data) => {
                            this.url = data;
                            console.log ('EL DATO ES: ', data);
                            resolve(this.url);
                            this.guardarUserImagen({
                              nombre: this.nombre,
                              url: this.url
                              });
                           });
                         })).subscribe();
    });








}


deleteUserImage(imagen) {
  const storageRef = firebase.storage().ref();
  const desertRef = storageRef.child( `${this.userProfileImage}/${ imagen}` );
  desertRef.delete().then(() => {
      console.log('Archivo Eliminado');
  }).catch((err) =>  console.log(err.message));
  this.uploadPercent = undefined;
  this.downloadURL = null;

}




private guardarUserImagen( imagen: { nombre: string, url: string} ) {
  this.db.collection(`/${ this.userProfileImage }`)
         .add(imagen);
}

}
