import {  Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private linkThema = document.querySelector('#theme');

  constructor(
  
    ) {
      console.log("Setting Service init");
      const url = localStorage.getItem('theme');
      this.linkThema.setAttribute('href',url);
  
   }

   cambiarColor( theme: string){

    const url = `./assets/css/colors/${theme}.css`;
    this.linkThema.setAttribute('href',url);
    localStorage.setItem('theme',url);

    this.cheekCurrentThema();

  }

  cheekCurrentThema():void{
    
    const links = document.querySelectorAll('.selector');
    
    links.forEach( elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkThema.getAttribute('href');
      if( btnThemeUrl === currentTheme ){
        elem.classList.add('working');
      }

    });
  }




}



