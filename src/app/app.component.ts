import { Component } from '@angular/core';
import { SettingService } from './services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public _ajustes: SettingService
  ){

  }
}
