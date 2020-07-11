import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

ajustes: Ajustes= {
  temaUrl: 'assets/css/colors/default.css',
  tema:'default'
}

  constructor(
    @Inject(DOCUMENT) private _document,
  ) {
    this.cargarAjustes();
   }


  guardarAjustes(){
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes))
    //console.log('Guardado en el localStorage');
  }

  cargarAjustes(){
    if( localStorage.getItem('ajustes') ){
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
      //console.log('Cargando  del localStorage');
      this.aplicarTema(this.ajustes.tema);
    }else{
      //console.log('Usando valor por defecto');
    }
  }

  aplicarTema( tema: string ){

    let url = `assets/css/colors/${tema}.css`
    this._document.getElementById('tema').setAttribute('href',url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

}


interface Ajustes{
  temaUrl: string,
  tema: string
}
