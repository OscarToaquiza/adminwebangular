import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import {Hospital} from '../models/hospital.model';
import { from } from 'rxjs';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  caragarHospital( ){
    const url = `${base_url}/hospitales`;
    return this.http.get(url, this.headers)
      .pipe(
        map(
          (resp: {ok:boolean,hospitales: Hospital[]})=>{
            return resp.hospitales
          }
        )
      );
  }

  crearHospital( nombre:string ){
    const url = `${base_url}/hospitales`;
    return this.http.post(url, {nombre},this.headers);
  }

  editarHospital( _id: string, nombre:string ){
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, {nombre},this.headers);
  }

  eliminarHospital(_id: string){
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }


}
