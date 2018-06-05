import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { EditarComponent } from './components/editar/editar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { ADMIN_ROUTES } from './components/admin/admin.routes';

const ROUTES: Routes = [
   { path: 'home', component: HomeComponent },
   { path: 'about', component: AboutComponent },
   { path: 'login', component: LoginComponent },
   { path: 'detalle/:id', component: DetalleComponent },
   { path: 'editar/:id', component: EditarComponent },
   { path: 'registro', component: RegistroComponent },
   {
     path: 'administrador',
      component: AdminComponent,
      children: ADMIN_ROUTES,
      canActivate: [ AuthGuard ] },
   { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
