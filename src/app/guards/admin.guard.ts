import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor( private usuariosService: UsuarioService, private router: Router ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    
      //return ( this,this.usuariosService.role === 'ADMIN_ROLE' ) ? true : false;
      if( this,this.usuariosService.role === 'ADMIN_ROLE' ){
        return true;
      }else{
        this.router.navigateByUrl('/dashboard');
        return false;
      }

  }
  
}
