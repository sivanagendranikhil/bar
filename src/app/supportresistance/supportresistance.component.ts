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
          this.rsCallSP = this.stocks[i].rs[0]
          this.rsPutSP = this.stocks[i].rs[1]
          this.resultCallArray.push(this.rsCallSP)
          this.resultPutArray.push(this.rsPutSP)
            this.spValue = this.stocks[i].sp[0]
            this.day = ' (Day'+this.count+')';
            this.resultSPArray.push(this.spValue + this.day) 
            this.count++;   
        }     
        this.todayResistance = this.stocks[this.stocks.length-1].rs[0]
        this.todaySupport = this.stocks[this.stocks.length-1].rs[1]  
      },
      (resp) => { 
        this.message = resp.message;
        console.log('Error!!!') 
      }
    );

    this.todayResistance = 11800
    this.todaySupport = 11600

  }

  public barChartOptions: ChartOptions = {
        scales: {
         xAxes: [{
          ticks: {
            padding: 10
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
          align: 'end'
        }
      }
  };
    public barChartLabels: Label[] = ['11700(Day 1)', '11600(Day 2)', '11600(Day 3)', '11700(Day 4)', '11600(Day 5)', '11700(Day 6)', '11600(Day 7)'];
    //public barChartLabels: Label[] = this.resultSPArray;
    public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [11700, 11700, 11700, 11700, 11700, 11700, 11800], fill: false, label: 'Support Values', datalabels: {
          anchor: 'start',
          align: 'start'
        } },
    { data: [11500, 11500, 11500, 11500, 11500, 11600, 11600], fill: false, label: 'Resistance Values', datalabels: {
          anchor: 'end',
          align: 'end'
        }}
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
