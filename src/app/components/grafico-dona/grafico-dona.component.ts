import { Component, Input, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

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


  public colors: Color[] = [
    { backgroundColor: ['#6857E6','#009FEE','#F02059'] }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
