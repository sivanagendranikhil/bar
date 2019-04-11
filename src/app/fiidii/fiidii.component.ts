
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';
import { StockService } from '../stock.service';
import { MyData } from './my-data';
  import { FiiDiiData } from './fii-dii';

@Component({
  selector: 'app-fiidii',
  templateUrl: './fiidii.component.html',
  styleUrls: ['./fiidii.component.css']
})
export class FiidiiComponent implements OnInit {

  stocks: MyData[];
  fiidii: FiiDiiData[];
  fii: Number;
  dii: Number;
  todayFii: Number;
  todayDii: Number;
  fiiDiiDiff: Number;
  message: string;
  atmCallValue: number;
  atmPutValue: number;
  todayCallATM: number;
  todayPutATM: number;
  finalPredict: string;
  todayPredict: string;
  count1: number = 0;
  count2: number = 0;
  resultFiiArray:Array<Number> = [];
  resultDiiArray:Array<Number> = [];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getFiiDiiData()
    .then(
      (resp) => { 
        this.fiidii = resp 
        for(let res of this.fiidii) {
          this.fii = res.fii
          this.dii = res.dii
          this.resultFiiArray.push(this.fii)         
          this.resultDiiArray.push(this.dii)    
        }
        // for(let i = this.fiidii.length-7; i < this.fiidii.length; i++) {
        //   this.atmCallValue = this.fiidii[i].atm[0]
        //   this.atmPutValue = this.fiidii[i].atm[1]
        //   this.resultCallArray.push(this.atmCallValue)         
        //   this.resultPutArray.push(this.atmPutValue)       
        // }
        // this.todayCallATM = this.stocks[this.stocks.length-1].atm[0]
        // this.todayPutATM = this.stocks[this.stocks.length-1].atm[1]
        // if(this.count1 > this.count2 && this.count1 > 3) {
        //   this.finalPredict = "Bullish";
        //   } else if(this.count1 < this.count2 && this.count2 > 3) {
        //     this.finalPredict = "Bearish";
        //   } else {
        //     this.finalPredict = "Moving Sideways";
        //   }

        this.todayDii = this.fiidii[this.fiidii.length-1].dii;
        this.todayFii = this.fiidii[this.fiidii.length-1].fii;
        if(this.todayDii > 0 && this.todayFii > 0) {
          this.todayPredict = "Bullish";
        } else if(this.todayDii < 0 && this.todayFii < 0) {
          this.todayPredict = "Bearish";
        } else {
        	this.fiiDiiDiff = this.fiidii[this.fiidii.length-1].dii - this.fiidii[this.fiidii.length-1].fii;
          if(this.fiiDiiDiff > 0) {
            this.todayPredict = "Slightly Bullish";
          } else {
          	this.todayPredict = "Slightly Bearish";
          }
        }
      },
      (resp) => { 
        this.message = resp.message;
        console.log('Error!!!') 
      }
    );

  }

  public barChartOptions: ChartOptions = {
        scales: {
         xAxes: [{
          ticks: {
            padding: 20
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
  public barChartLabels: Label[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.resultFiiArray, fill: false, label: 'Fii Diff Values', datalabels: {
          anchor: 'end',
          align: 'end'
        }  },
    { data: this.resultDiiArray, fill: false, label: 'Dii Diff Values'
    , datalabels: {
          anchor: 'start',
          align: 'start'
        }  }
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
