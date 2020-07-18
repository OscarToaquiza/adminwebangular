import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(
    private settingService: SettingService
  ) { }

  ngOnInit(): void {
    init_plugins();
  }

}
