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
           resultSPArray:Array<string> = [];
    spValue: number;
    count: number = 1;
    day: string;

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
                   //start
            this.spValue = this.stocks[i].sp[0];
            this.day = ' (Day'+this.count+')';
            this.resultSPArray.push(this.spValue + this.day) 
            this.count++;   
            //end
          }      
          this.todayCallIV = this.stocks[this.stocks.length-1].iv[0]
          this.todayPutIV = this.stocks[this.stocks.length-1].iv[1] 
        },
        (resp) => { 
          this.message = resp.message;
          console.log('Error!!!') 
        }
      );

      // STATIC DATA

      this.todayCallIV = 10.86
      this.todayPutIV = 9.42

    }

    public barChartOptions: ChartOptions = {
          scales: {
         xAxes: [{
          ticks: {
            padding: 15
          }
        }],
        yAxes: [{
          ticks: {
            padding: 10
          }
        }]
      },
      responsive: true,
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    public barChartLabels: Label[] = ['11700(Day 1)', '11600(Day 2)', '11600(Day 3)', '11700(Day 4)', '11600(Day 5)', '11700(Day 6)', '11600(Day 7)'];
    //public barChartLabels: Label[] = this.resultSPArray;
    public barChartType: ChartType = 'line';
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [
      // data: this.resultCallArray
      // data: this.resultPutArray
      { data: [11.47, 15.35, 16.68, 16.29, 0.00, 10.61, 10.86], fill: false, label: 'IV Call Values' , datalabels: {
          anchor: 'end',
          align: 'end'
        } },
      { data: [10.20, 14.73, 13.01, 8.95, 0.00, 9.77, 9.42], fill: false, label: 'IV Put Values' , datalabels: {
          anchor: 'start',
          align: 'start'
        } }
    ];

    public barChartPlugins = [pluginDataLabels];

    public barChartColors: Color[] = [
    {
      borderColor: 'green',
      pointBorderColor: '#ffffff'
    },
    { 
      borderColor: 'red',
      pointBorderColor: '#fff'
    }
  ]






    
  }
