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
          { path: '', redirectTo: '/dashboard' , pathMatch: 'full' },
        ]
      }

];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})

export class PageRoutingModule {}
