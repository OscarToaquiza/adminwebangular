import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    init_plugins();
    this.sidebarService.cargarMenu();
  }

}
