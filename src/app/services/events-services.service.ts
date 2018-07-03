import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsServicesService {

  public eventosCollection: AngularFirestoreCollection<any>;
  public eventos: Observable<any>;
  public eventoDoc: AngularFirestoreDocument<any>;
  public idDeEvento: string;
  constructor(private _afs: AngularFirestore) {
    this.eventosCollection = this._afs.collection('events', ref => ref);
  }

  addEvento(evento) {

       return this.eventosCollection.add(evento);

  }

  getEventos(): Observable<any> {
      this.eventos = this.eventosCollection.snapshotChanges()
                                             .pipe(map(changes => {
                                               return changes.map(action => {
                                                 const data = action.payload.doc.data();
                                                 data.id = action.payload.doc.id;
                                                 // console.log ( data );
                                                 return data;
                                               });
                                             }));
     return this.eventos;
  }

  updateEvent(evento) {
    console.log('EVENTO ID ID DE ENVENTO DEL SERVICE ', evento.id);
        this.eventoDoc = this._afs.doc(`events/${evento.id}`);
        this.eventoDoc.update(evento);
  }

  deleteEvent(eventId) {
        this.eventoDoc = this._afs.doc(`events/${eventId}`);
        this.eventoDoc.delete();
  }

}
