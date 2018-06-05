import { RouterModule, Routes } from '@angular/router';
import { NoticiasAdminComponent } from './admin_components/noticias-admin/noticias-admin.component';
import { ProgramacionAdminComponent } from './admin_components/programacion-admin/programacion-admin.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'add_noticias', component: NoticiasAdminComponent },
  { path: 'add_programacion', component: ProgramacionAdminComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'add_noticias' }
];
