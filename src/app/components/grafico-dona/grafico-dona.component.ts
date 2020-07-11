import { Component, Input, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() titulo: string = 'Titulo'
  @Input() data : MultiDataSet;
  @Input() labels: Label[];
  @Input() chartType: ChartType;  

  constructor() { }

  ngOnInit(): void {
  }

}
