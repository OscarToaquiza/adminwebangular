import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuarios.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = []
  public hospitales: Hospital[] = []
  public medicos: Medico[] = []

  constructor( private activatedRouter: ActivatedRoute, private busquedaService: BusquedasService ) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(  ({termino})=>this.busquedaGlobal(termino) );

  }

  busquedaGlobal(termino: string){
    this.busquedaService.busquedaGlobal( termino ).subscribe(
      (resp:any) => {
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      }
    );
  }

  abrirMedico(medico: Medico){

  }

}
