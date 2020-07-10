import { NgModule } from "@angular/core";

//Modulo
import { SharedModule } from '../shared/shared.module';

//Rutas
import { PagesRouters } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

@NgModule({

    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component        
    ],
    imports:[
        SharedModule,
        PagesRouters
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ]

})

export class PagesModule{}