import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {

  // Recive como parametro a un elemento html
   @ViewChild('txtProgress') txtProgress:ElementRef; 

@Input('nombre') leyenda: string = 'Leyenda';
@Input() porcentaje:number = 50;
@Input() btnClass:string = 'btn-primary';

@Output('valorActualizar') cambioPorcentaje: EventEmitter<number> = new EventEmitter();



  constructor() { 
  }

  ngOnInit(): void {

    this.btnClass = `btn ${this.btnClass}`;

  }


  // Se puede usar JS puro en Angular.
  //let elemHTML:any = document.getElementsByName('porcentaje')[0];
  //elemHTML.value = Number( this.porcentaje );
  onChange(  newValue: number ){
    console.log(this.txtProgress);

    if( newValue >= 100 ){
      this.porcentaje = 100;
    }else if(newValue <= 0){
      this.porcentaje = 0;
    }else{
      this.porcentaje = newValue;
    }

    this.txtProgress.nativeElement.event = this.porcentaje;

    this.cambioPorcentaje.emit( this.porcentaje );
    this.txtProgress.nativeElement.focus();


  }
  cambiarValor(valor){
    
    if(this.porcentaje >= 100 && valor > 0 ){
      this.porcentaje = 100;
      return;
    }

    if(this.porcentaje <= 0 && valor < 0 ){
      this.porcentaje = 0;
      return;
    }
    
    this.porcentaje = this.porcentaje + valor;

    this.cambioPorcentaje.emit( this.porcentaje );


  }

}
