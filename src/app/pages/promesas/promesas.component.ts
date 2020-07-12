import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { 

    this.contarTres().then(
      res => console.log('TERMINO!!', res)
    ).catch(
      error => console.log('Error en la promesa',error)
    )
  }

  ngOnInit(): void {
  }


  contarTres(): Promise<boolean>{
    
    return new Promise( (resolve, reject)=>{

      let contador = 0;

      let intervalo =  setInterval( ()=>{

        contador +=1;
         console.log(contador);

        if(contador === 3){
          //resolve();
          /**
           * 1
           * 2
           * 3
           * TERMINO!!
           */
          //reject('simplemente un error');
          /**
           * 1
           * 2
           * 3
           * error...
           */
          resolve(true);
          clearInterval(intervalo);
        }

      },1000 );

    });

   // return promesa;
  }



}
