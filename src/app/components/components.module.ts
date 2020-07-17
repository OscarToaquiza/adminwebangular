import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

//ng2 chars
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ChartsModule
    ],
    declarations:[
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    exports:[
        IncrementadorComponent,
        GraficoDonaComponent
    ]
})

export class ComponentsModule{}