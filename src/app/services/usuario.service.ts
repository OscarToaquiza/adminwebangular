import { Injectable, NgZone, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterForm } from '../interfaces/register.form';
import { LoginForm } from '../interfaces/login.form';
import { Usuario } from '../models/usuarios.model';
import { environment } from '../../environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios';
import { tap, map, catchError } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get uid(): string{
    return  this.usuario.uid || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  guardarLocalStorage( token: any, menu: any ){
    localStorage.setItem('token', token);
    localStorage.setItem('menu',  JSON.stringify(menu));
  }
  googleInit() {

    return new Promise(resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '260431046843-u47ulqggf0rt6akhr11faohc7amiraq7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve();

      });

    })

  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("/login");
      });
    });
  }

  validarToken(): Observable<boolean> {
    
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map(
        (resp: any) => {
          console.log(resp);
          const {email,google,nombre,role,uid,img} = resp.usuario;
          this.usuario = new Usuario(nombre,email,'',img,google,role,uid);
          this.usuario.imprimir();
          this.guardarLocalStorage(resp.token,resp.menu);
          return true;
        }
      ),
      catchError(
        error => of(false)
      )
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap(
        (resp: any) => {
          this.guardarLocalStorage(resp.token,resp.menu);
        }
      )
    );
  }

  actualizarPerfil( data:{ email: string, nombre: string, role:string} ){
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,  this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap(
        (resp: any) => {
          this.guardarLocalStorage(resp.token,resp.menu);;
        }
      )
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap(
        (resp: any) => {
          this.guardarLocalStorage(resp.token,resp.menu);
        }
      )
    );
  }

  caragarUsuario( desde: number = 0){
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map(
        resp =>{
          console.log(resp.usuarios);
          const usuarios = resp.usuarios.map( user => new Usuario(
                                                          user.nombre,
                                                          user.email,
                                                          '',
                                                          user.img,
                                                          user.google,
                                                          user.role,
                                                          user.uid) )

          return {
            total: resp.total,
            usuarios: usuarios
          }
        }   
      )
    )
  }

  eliminarUsuario( usuario: Usuario ){
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete( url, this.headers );
  }

  actualizarRol( usuario: Usuario ){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario,  this.headers);
  }


}
