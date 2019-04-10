 import { Component, OnInit } from '@angular/core';
  import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import * as pluginDataLabels from 'chartjs-plugin-datalabels';
  import { Label, Color } from 'ng2-charts';
  import { StockService } from '../stock.service';
 import { MyData } from './my-data';
@Component({
  selector: 'app-impliedvolatality',
  templateUrl: './impliedvolatality.component.html',
  styleUrls: ['./impliedvolatality.component.css']
})
export class ImpliedvolatalityComponent implements OnInit {

    stocks: MyData[];
    message: string;
    oiCallValue: number;
    oiPutValue: number;
    todayCallIV: number;
    todayPutIV: number;
    resultCallArray:Array<number> = [];
    resultPutArray:Array<number> = [];

    constructor(private stockService: StockService) { }

    ngOnInit() {
      this.stockService.getData()
      .then(
        (stocks) => { 
          this.stocks = stocks
          for(let i = this.stocks.length-7; i < this.stocks.length; i++) {
            this.oiCallValue = this.stocks[i].iv[0]
            this.oiPutValue = this.stocks[i].iv[1]
            this.resultCallArray.push(this.oiCallValue)
            this.resultPutArray.push(this.oiPutValue)   
          }      
          this.todayCallIV = this.stocks[this.stocks.length-1].iv[0]
          this.todayPutIV = this.stocks[this.stocks.length-1].iv[1] 
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
          align: 'end',
        }
      }
    };
    public barChartLabels: Label[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    public barChartType: ChartType = 'line';
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [
      { data: this.resultCallArray, fill: false, label: 'IV Call Values' , datalabels: {
          anchor: 'end',
          align: 'end'
        } },
      { data: this.resultPutArray, fill: false, label: 'IV Put Values' , datalabels: {
          anchor: 'start',
          align: 'start'
        } }
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
