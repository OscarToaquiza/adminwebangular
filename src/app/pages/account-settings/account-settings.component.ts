import { Component,  ElementRef,  OnInit } from '@angular/core';
import { SettingService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public _ajustes : SettingService
  ) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor( color: string, link: any ){
    this.aplicarCheck(link);
    this._ajustes.aplicarTema( color );
  }

  aplicarCheck( link:any ){
    let selectores: any = document.getElementsByClassName('selector');
    for(let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(){
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for(let ref of selectores) {
      if( ref.getAttribute('data-theme') == tema ){
        ref.classList.add('working');
        break;
      }
    }
  }

}
