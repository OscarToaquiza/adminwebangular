import { NgModule } from "@angular/core";

//Modulo
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
//ng 2 chars
import { ChartsModule } from 'ng2-charts';

//Rutas
import { PagesRouters } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

//temp
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({

    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent
    ],
    imports:[
        SharedModule,
        FormsModule,
        ChartsModule,
        PagesRouters
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ]

})

export class PagesModule{}