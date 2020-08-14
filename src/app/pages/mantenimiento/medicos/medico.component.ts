import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[];
  public medicoForm: FormGroup;
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe( ({id}) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre : ['', Validators.required],
      hospital : ['', Validators.required],
    });
    //Observable para el form reactivo.
    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe(
      hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
      }
    );
  }

  cargarMedico(id: string){
    console.log(id);
    if(id == 'nuevo'){
      return;
    }
      this.medicoService.getMedico(id)
      .pipe(
        delay(100)
      ).subscribe(
        resp => {
          console.log(resp);
          if(!resp){
            return   this.router.navigateByUrl(`/dashboard/medicos`);
          }

          const {nombre, hospital:{_id}} = resp;
          this.medicoSeleccionado = resp;
          this.medicoForm.setValue({nombre, hospital: _id});
        },
        err =>{
          console.log(err);
          return   this.router.navigateByUrl(`/dashboard/medicos`);
        }
      );    
  }
  guardarMedico(){

    const {nombre} = this.medicoForm.value;

    if(this.medicoSeleccionado){
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.editarMedico(data).subscribe(
        resp => {
          Swal.fire('Actualizado',`${nombre} actualizado correctamente`,'success');
        }
      );
    }else{
      this.medicoService.crearMedico( this.medicoForm.value ).subscribe(
        (resp:any) => {
          Swal.fire('Creado',`${nombre} creado correctamente`,'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
          this.medicoSeleccionado = resp.medico;
        }
        );
      }
  }

  cargarHospitales(){
    this.hospitalService.caragarHospital().subscribe(
      resp => {
       this.hospitales = resp;
      }
    );
  }

}
