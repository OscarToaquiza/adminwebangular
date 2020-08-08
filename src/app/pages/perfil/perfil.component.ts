import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm : FormGroup;
  public usuario: Usuario;


  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( 
    private fb : FormBuilder, 
    private usuarioService: UsuarioService, 
    private fileUploadService: FileUploadService ) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre , Validators.required],
      email: [this.usuario.email ,[Validators.required,Validators.email]]
    })
  }

  actulizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      resp => {
        console.log(resp);
        const {nombre, email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado','Cambios guardados con exito','success');

      },
      error => {
        //this.perfilForm.get('email').value = this.usuario.email;
        Swal.fire('Error',error.error.msg,'error');
      }
    );
    console.log(this.perfilForm.value);
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;
    if( !file ){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onload = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
      .then(
        resp => {
          if(resp){
            this.usuario.img = resp;
            Swal.fire('Guardado','Imagen actualizada','success');
          }else{
            console.log('Selecione una imgen');
          }
          
        }
      ).catch(
        err => {
          console.log(err);
          console.log('No se pudo subir la imagen')
        } 
      );
  }



}
