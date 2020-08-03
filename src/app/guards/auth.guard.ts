import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap,map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/shared/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService, private router: Router ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return  this.usuarioService.validarToken().pipe(
      tap(
        resp => {
          if(!resp){
            this.router.navigateByUrl("/login");
          }
        }
      )
    );

  }
  
}
