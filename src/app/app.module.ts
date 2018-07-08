import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';


// date picker ngbDatepicker
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

// // Calendar module
// import localeEs from '@angular/common/locales/es';
// import { CalendarModule } from 'angular-calendar';
// import { CalendarHeaderComponent } from 'src/app/utils/utils.calendar-header';
// import { CalendarDatePipe } from 'angular-calendar/modules/common/calendar-date.pipe.d';
// import {  CustomDateFormatter } from 'src/app/utils/utils.custom.formater-provider';
// import { registerLocaleData } from '@angular/common';
// registerLocaleData(localeEs);

// // FullCalendar module
// import { FullCalendarModule } from 'ng-fullcalendar';

// FIREBASE modules

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
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { OcupacionLocalAdminComponent } from './components/admin/admin_components/ocupacion-local-admin/ocupacion-local-admin.component';
import { FullCalendarDirective } from './directives/full-calendar.directive';
import { EventsmodelDirective } from './directives/eventsmodel.directive';
import { UserProfileComponent } from './components/admin/admin_components/user-profile/user-profile.component';
import { MiProgramaComponent } from './components/admin/admin_components/mi-programa/mi-programa.component';
import { DetailsUploadComponent } from './components/details-upload/details-upload.component';
import { ListUploadComponent } from './components/list-upload/list-upload.component';



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
    // CalendarHeaderComponent,
    OcupacionLocalAdminComponent,
    FullCalendarDirective,
    EventsmodelDirective,
    UserProfileComponent,
    MiProgramaComponent,
    DetailsUploadComponent,
    ListUploadComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    // FullCalendarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule.forRoot(),
    // CalendarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
