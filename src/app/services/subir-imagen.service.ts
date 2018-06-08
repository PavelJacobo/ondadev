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
export class SubirImagenService {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  private CARPETA_IMAGENES = 'img/';

  constructor(private storage: AngularFireStorage,
            private db: AngularFirestore) { }


  upload ( imagen, nombre ) {


      const file = imagen.target.files[0];
      const filePath = `${ this.CARPETA_IMAGENES}/${ nombre }`;
      const  fileRef = this.storage.ref(filePath);
      const task =  fileRef.put(file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe( finalize(() => {

                          this.downloadURL = fileRef.getDownloadURL() ;
                          this.downloadURL.subscribe((data)=>{ console.log(data)});

                        })).subscribe();



  }


  private guardarImagen( imagen: { nombre: string, url: string} ) {
    this.db.collection(`/${ this.CARPETA_IMAGENES }`)
           .add(imagen);
  }
}
