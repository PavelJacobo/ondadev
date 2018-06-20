import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Calendar module

import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from 'src/app/utils/utils.calendar-header';
import { CalendarDatePipe } from 'angular-calendar/modules/common/calendar-date.pipe.d';


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
import { AngularFireStorageModule } from 'angularfire2/storage';
import { OcupacionLocalAdminComponent } from './components/admin/admin_components/ocupacion-local-admin/ocupacion-local-admin.component';


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
    NoimagePipe,
    CalendarHeaderComponent,
    OcupacionLocalAdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    CalendarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
