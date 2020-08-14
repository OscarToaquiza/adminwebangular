import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public usuarioIdLogueado: string;

  public totalUsuarios: number = 0;
  public usuarios:Usuario[] = [];
  public usuarioTemp:Usuario[] = [];

  public desde: number = 0;
  public cargando: boolean = true;

  public imgSubs : Subscription;

  constructor( private usuariosService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService) { 
      this.usuarioIdLogueado = usuariosService.uid;
    }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuario();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(img => this.cargarUsuario());
  }

  cargarUsuario(){
    this.cargando = true;
    this.usuariosService.caragarUsuario(this.desde).subscribe(
      resp => {
        this.totalUsuarios = resp.total;
        if( resp.usuarios.length !== 0 ){
          this.usuarios = resp.usuarios;
          this.usuarioTemp = resp.usuarios;
        }
        this.cargando = false;
      }
    );
  }

  cambiarPagina( valor: number ){
    this.desde += valor;
    if(this.desde < 0){
      this.desde = 0
    }else if(this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuario();
  }

  buscar( termino: string ){
    if (termino.length === 0) {
        return this.usuarios= this.usuarioTemp;
    }
    this.busquedaService.buscar('usuarios',termino).subscribe(
      (resp: Usuario[]) => {
        this.usuarios = resp;
      }
    );
  }

  eliminarUsuario( usuario: Usuario ){

    if( usuario.uid === this.usuariosService.uid ){
      return Swal.fire('Error','No puede borrarse a si mismo','info');
    }

    Swal.fire({
      title: 'Borrar usuario',
      text: "Esta a punto de borrar el usuario " + usuario.nombre,
      icon:'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then( (result) => {
      if( result.value ){
        this.usuariosService.eliminarUsuario(usuario).subscribe(
          resp => {
            Swal.fire(
              'Eliminado!',
              `El ${usuario.nombre} fue eliminado`,
              'success'
              );
              this.cargarUsuario();
            }
        )
      }

    } )
  }

  cambiarRole( usuario:Usuario ){
    this.usuariosService.actualizarRol(usuario).subscribe(
      resp => console.log(resp)
    );
  }

  abrirModal(usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
  }

}
