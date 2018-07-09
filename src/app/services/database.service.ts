import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { map } from 'rxjs/internal/operators/map';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {Profile } from 'src/app/interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

 public userProfile: string = 'userProfile';
 public userDoc: AngularFirestoreDocument;
 public userCollection: AngularFirestoreCollection <Profile>;
 public docId: Observable<Profile[]>;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) {
                this.userCollection = this.db.collection('userProfile', ref => ref);
               }

  public guardarUsuario( usuario: Profile ) {
   this.db.collection(`/${ this.userProfile }`)
           .add(usuario).then((DocRef) => {
             console.log('Documento de Referencia', DocRef.id);
            //  this.setIdToUser(DocRef.id);
            });
  }

  // private setIdToUser(idContent) {
  //     let usuario = { id_content: '' };
  //     usuario.id_content = idContent;
  //     this.userDoc = this.db.doc(`userProfile/${idContent}`);
  //     this.userDoc.update(usuario);

  // }
  public updateUsuario(usuario){
    console.log('Aquí llega');
    console.log(usuario);
    this.userDoc = this.db.doc(`userProfile/${usuario.id_content}`);
    this.userDoc.update(usuario);
  }

  getUserProfile(idUser) {
    this.userCollection = this.db.collection('userProfile', ref => ref.where('id', '==', idUser) );

   this.docId = this.userCollection.snapshotChanges().map( changes => {
        return changes.map(a => {
            const data = a.payload.doc.data() as Profile;
            data.id_content = a.payload.doc.id;
            // console.log('DATAAAA', data);
            return data;
        });
    });
    return this.docId;
  }

}
