import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({

    imports:[
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations:[
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ]

})

export class SharedModule{}