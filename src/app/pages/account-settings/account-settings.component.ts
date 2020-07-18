import { Component,  ElementRef,  OnInit } from '@angular/core';
import { SettingService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  
  constructor(
    private settingService: SettingService
  ) { }

  ngOnInit(): void {
    this.settingService.cheekCurrentThema();  
  }

  cambiarColor( theme: string){
    this.settingService.cambiarColor(theme);
  }


}
