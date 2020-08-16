import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuarios.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers( ){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  private trasnformrUsuarios(resultados: any[]): Usuario[]{
    return resultados.map( 
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid) 
    );
  }

  private trasnformrHospitales(resultados: any[]): Hospital[]{
    return resultados;
  }

  private trasnformrMedicos(resultados: any[]): Medico[]{
    return resultados;
  }

  buscar(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string ){
      const url = `${base_url}/todo/collection/${tipo}/${termino}`;
      return this.http.get<any[]>(url, this.headers).pipe(
        map(
          (resp:any) => {
            switch (tipo) {
              case 'usuarios':    
                  return this.trasnformrUsuarios(resp.data);
              case 'hospitales':    
                  return this.trasnformrHospitales(resp.data);
              case 'medicos':    
              return this.trasnformrMedicos(resp.data);
              default:
                return[]
            }
          }
        )
      )
    }

    busquedaGlobal(termino : string){
      const url = `${base_url}/todo/${termino}`;
      return this.http.get(url, this.headers);
    }

}
