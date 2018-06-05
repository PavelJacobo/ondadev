import { Injectable } from '@angular/core';
import { Noticias } from '../models/noticias';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from "rxjs/Observable";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  public noticiasCollection: AngularFirestoreCollection<Noticias>;
  public noticiaDoc: AngularFirestoreDocument<Noticias>;
  public noticias: Observable<Noticias[]>;
  public noticia: Observable<Noticias>;

  constructor(private _afs: AngularFirestore) {

        this.noticiasCollection = this._afs.collection('noticias', ref => ref);

   }


    addNoticia(noticia: Noticias){
        this.noticiasCollection.add(noticia).then((res)=>{
          console.log(res);
        }).catch(err=>console.log(err));
    }


    getNoticias():Observable<Noticias[]>{
        this.noticias = this.noticiasCollection.snapshotChanges()
                                               .pipe(map(changes => {
                                                 return changes.map(action => {
                                                   const data = action.payload.doc.data() as Noticias;
                                                   data.id = action.payload.doc.id;
                                                   return data;
                                                 });
                                               }));
       return this.noticias;
    }

    getNoticia(idNoticia:string){
        this.noticiaDoc = this._afs.doc<Noticias>(`noticias/${idNoticia}`);
        this.noticia = this.noticiaDoc.snapshotChanges().pipe(map(action => {
          if(action.payload.exists === false){
            return null;
          }else{
            const data = action.payload.data() as Noticias;
            data.id = action.payload.id;
            return data;
          }
        }));
        return this.noticia;
    }

    updateNoticia(noticia:Noticias){
          this.noticiaDoc = this._afs.doc(`noticias/${noticia.id}`);
          this.noticiaDoc.update(noticia);
    }

    deleteNoticia(noticia: Noticias){
          this.noticiaDoc = this._afs.doc(`noticias/${noticia.id}`);
          this.noticiaDoc.delete();
    }





}
