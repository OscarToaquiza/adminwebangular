import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  
  public usuario : Usuario;
  
  constructor( private usuarioService: UsuarioService, private route:Router ) { 
    this.usuario = usuarioService.usuario;
  }
  
  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

  buscar(termino: string){
    if(termino.length === 0){
      return;
    }
    this.route.navigateByUrl('/dashboard/buscar/'+termino);
  }

}
