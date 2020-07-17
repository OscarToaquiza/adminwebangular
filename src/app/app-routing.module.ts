import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Modulos
import { PageRoutingModule } from './pages/pages.routes';
import { AuthRoutingModule } from './auth/auth.routing'
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const appRouters: Routes = [
  { path: '', redirectTo: '/dashboard' , pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRouters),
    PageRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
