import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//FIREBASE modules

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


///

import { FormsModule } from '@angular/forms';

//



import { AuthGuard } from './guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { NoticiasAdminComponent } from './components/admin/admin_components/noticias-admin/noticias-admin.component';
import { ProgramacionAdminComponent } from './components/admin/admin_components/programacion-admin/programacion-admin.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { EditarComponent } from './components/editar/editar.component';
import { NoimagePipe } from './pipes/noimage.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    RegistroComponent,
    LoginComponent,
    AdminComponent,
    NoticiasAdminComponent,
    ProgramacionAdminComponent,
    DetalleComponent,
    EditarComponent,
    NoimagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
