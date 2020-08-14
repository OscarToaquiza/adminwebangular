import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';

const pagesRoutes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children:[
          { path: '', component:DashboardComponent, data: { titulo: 'Dashboard' }},
          { path: 'progress', component:ProgressComponent, data: { titulo: 'Progress' } },
          { path: 'graficas1', component:Graficas1Component,  data: { titulo: 'Gráficas' } },
          { path: 'promesas', component:PromesasComponent,  data: { titulo: 'Promesas' } },
          { path: 'rxjs', component: RxjsComponent,  data: { titulo: 'RxJs' } },
          { path: 'account-setting', component:AccountSettingsComponent,  data: { titulo: 'Ajustes del Tema' } },
          { path: 'perfil', component:PerfilComponent,  data: { titulo: 'Perfil de Usuario' } },
          { path: '', redirectTo: '/dashboard' , pathMatch: 'full' },

          //Matenimientos
          { path: 'usuarios', component:UsuariosComponent,  data: { titulo: 'Usuarios de Aplicación' } },
          { path: 'hospitales', component:HospitalesComponent,  data: { titulo: 'Hospitales' } },
          { path: 'medicos', component:MedicosComponent,  data: { titulo: 'Medicos' } },
          { path: 'medico/:id', component:MedicoComponent,  data: { titulo: 'Editar Medico' } },

        ]
      }

];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})

export class PageRoutingModule {}
