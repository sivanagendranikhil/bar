import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';
import { StockService } from '../stock.service';
import { MyData } from './my-data';

@Component({
  selector: 'app-supportresistance',
  templateUrl: './supportresistance.component.html',
  styleUrls: ['./supportresistance.component.css']
})
export class SupportresistanceComponent implements OnInit {

  stocks: MyData[];
  message: string;
  rsCallSP: number;
  rsPutSP: number;
  todayResistance: number;
  todaySupport: number;
  resultCallArray:Array<number> = [];
  resultPutArray:Array<number> = [];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getData()
    .then(
      (stocks) => { 
        this.stocks = stocks 
        for(let i = this.stocks.length-7; i < this.stocks.length; i++) {
          this.rsCallSP = this.stocks[i].rs[0]
          this.rsPutSP = this.stocks[i].rs[1]
          this.resultCallArray.push(this.rsCallSP)
          this.resultPutArray.push(this.rsPutSP)
        }     
        this.todayResistance = this.stocks[this.stocks.length-1].rs[0]
        this.todaySupport = this.stocks[this.stocks.length-1].rs[1]  
      },
      (resp) => { 
        this.message = resp.message;
        console.log('Error!!!') 
      }
    );

  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end'
        }
      }
  };
  public barChartLabels: Label[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.resultCallArray, fill: false, label: 'Resistance Values', datalabels: {
          anchor: 'start',
          align: 'start'
        } },
    { data: this.resultPutArray, fill: false, label: 'Support Values', datalabels: {
          anchor: 'end',
          align: 'end'
        }}
  ];

  public barChartPlugins = [pluginDataLabels];

  public barChartColors: Color[] = [
    {
      borderColor: 'red',
      pointBorderColor: '#ffffff'
    },
    { 
      borderColor: 'green',
      pointBorderColor: '#fff'
    }
  ]
  
}
