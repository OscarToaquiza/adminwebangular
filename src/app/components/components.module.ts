import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { ModalImagenComponent } from '../components/modal-imagen/modal-imagen.component';
//ng2 chars
import { ChartsModule } from 'ng2-charts';
import { from } from 'rxjs';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ChartsModule,
    ],
    declarations:[
        IncrementadorComponent,
        GraficoDonaComponent,
        ModalImagenComponent
    ],
    exports:[
        IncrementadorComponent,
        GraficoDonaComponent,
        ModalImagenComponent
    ]
})

export class ComponentsModule{}