import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription, interval } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {


  public intervaloSus : Subscription;
  susbscription: Subscription;

  constructor() { 


// this.susbscription = this.regresaObservavle().pipe(
//       retry(2),
//       map( resp => {
//         return resp.valor
//       }),
//       filter( (valor, index) => {
//         //console.log( 'Filtros ', valor, index );
//         if( (valor%2) === 1 ){
//           return true;
//         }else{
//           return false;
//         }
//       } )
//     ).subscribe( resp => {
//       console.log( 'Subs ', resp);
//     },
//     error => {
//       console.error('Error en el observable',error);
//     },
//     () => {
//       console.log('El observador ha terminado')
//     }
//     );


    this.intervaloSus = this.retornIntervalo().subscribe(
      console.log
    );


  }

  ngOnInit(): void {

  }

  ngOnDestroy(){
    console.log("La pagina se va cerrar");
    //this.susbscription.unsubscribe();
    this.intervaloSus.unsubscribe();
    //Me da error si el suscribe nose inicializa.
  }


  regresaObservavle(): Observable<any>{

    return new Observable(
      (resp: Subscriber<any>) => {
        let contador = 0;
        let intervalo = setInterval(()=>{
          
          contador +=1;

          const salida = {
            valor: contador
          }

          resp.next( salida );

          // if(contador ===3){
          //   clearInterval(intervalo);
          //   //Poner fin al observer
          //   resp.complete();
          // }

          // if(contador == 2){
          //   clearInterval(intervalo);
          //   resp.error('Auxilio');
          // }

        },1000);
      }
    );

    //return obs;

  }


  retornIntervalo(): Observable<any>{
    return interval(500)
                      .pipe(
                        take(100),
                        map( resp => resp + 1 ),
                        filter( resp => {
                          if( resp % 2 === 0  ){
                            console.log('NumPar');
                            return true;
                          }else{
                            console.log('NumImpar');
                            return false;
                          }
                        })
    );
    
  }

}
