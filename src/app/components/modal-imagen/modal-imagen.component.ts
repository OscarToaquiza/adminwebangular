import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImagenService }from '../../services/modal-imagen.service';
@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService, private fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir,tipo,id)
      .then(
        resp => {
          if(resp){
            Swal.fire('Guardado','Imagen actualizada','success');
            this.modalImagenService.nuevaImagen.emit(resp);
            this.cerrarModal();
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
