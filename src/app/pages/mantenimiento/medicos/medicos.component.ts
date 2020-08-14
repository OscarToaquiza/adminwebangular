import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { MedicoService} from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[]

  private imgSubs : Subscription;

  constructor( private medicoService: MedicoService, 
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe(img => this.cargarMedicos());
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.caragarMedicos().subscribe(
      resp => {
        console.log(resp);
        this.cargando = false;
        this.medicos = resp;
      }
    )
  }
  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);
  }

  buscar( termino: string ){
    if (termino.length === 0) {
        return this.cargarMedicos();
    }
    this.busquedaService.buscar('medicos',termino).subscribe(
      resp => {
        this.medicos = resp;
      }
    );
  }

  borrarMedico(medico: Medico){
    
      Swal.fire({
        title: 'Borrar médico',
        text: "Esta a punto de borrar el usuario " + medico.nombre,
        icon:'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d5',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then( (result) => {
        if( result.value ){
          this.medicoService.borrarMedico(medico._id).subscribe(
            resp => {
              Swal.fire(
                'Eliminado!',
                `El ${medico.nombre} fue eliminado`,
                'success'
                );
                this.cargarMedicos();
              }
          )
            }
      });
  }

}
