import { RouterModule, Routes } from '@angular/router';
import { OcupacionLocalAdminComponent } from 'src/app/components/admin/admin_components/ocupacion-local-admin/ocupacion-local-admin.component';
import { NoticiasAdminComponent } from './admin_components/noticias-admin/noticias-admin.component';
import { ProgramacionAdminComponent } from './admin_components/programacion-admin/programacion-admin.component';
import { UserProfileComponent }  from './admin_components/user-profile/user-profile.component';
import { MiProgramaComponent }  from './admin_components/mi-programa/mi-programa.component';
export const ADMIN_ROUTES: Routes = [
  { path: 'add_noticias', component: NoticiasAdminComponent },
  { path: 'add_programacion', component: ProgramacionAdminComponent },
  { path: 'add_ocupacion', component: OcupacionLocalAdminComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'programa', component: MiProgramaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'add_noticias' }
];
