import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';
import { StockService } from '../stock.service';
import { MyData } from './my-data';

@Component({
  selector: 'app-atthemoney',
  templateUrl: './atthemoney.component.html',
  styleUrls: ['./atthemoney.component.css']
})
export class AtthemoneyComponent implements OnInit {

  stocks: MyData[];
  message: string;
  atmCallValue: number;
  atmPutValue: number;
  todayCallATM: number;
  todayPutATM: number;
  finalPredict: string;
  todayPredict: string;
  count1: number = 0;
  count2: number = 0;
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
          this.atmCallValue = this.stocks[i].atm[0]
          this.atmPutValue = this.stocks[i].atm[1]
          this.resultCallArray.push(this.atmCallValue)         
          this.resultPutArray.push(this.atmPutValue)   
                        //start
            this.spValue = this.stocks[i].sp[0];
            this.day = ' (Day'+this.count+')';
            this.resultSPArray.push(this.spValue + this.day) 
            this.count++;   
            //end 
          if(this.stocks[i].atm[2] == 1) {
            this.count1 = this.count1 + 1
          }
          if(this.stocks[i].atm[2] == -1) {
            this.count2 = this.count2 + 1 
          }       
        }
        this.todayCallATM = this.stocks[this.stocks.length-1].atm[0]
        this.todayPutATM = this.stocks[this.stocks.length-1].atm[1]
        if(this.count1 > this.count2 && this.count1 > 3) {
          this.finalPredict = "Bullish";
          } else if(this.count1 < this.count2 && this.count2 > 3) {
            this.finalPredict = "Bearish";
          } else {
            this.finalPredict = "Moving Sideways";
          }

        if(this.stocks[this.stocks.length-1].atm[2] == 1) {
          this.todayPredict = "Bullish";
        } else if(this.stocks[this.stocks.length-1].atm[2] == -1) {
          this.todayPredict = "Bearish";
        } else {
          this.todayPredict = "Moving Sideways";
        }
      },
      (resp) => { 
        this.message = resp.message;
        console.log('Error!!!') 
      }
    );

    // STATIC DATA

    this.todayPredict = "Bullish"
    this.todayCallATM = 44.40
    this.todayPutATM = 41.05

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
 public barChartLabels: Label[] = ['11700(Day 1)', '11600(Day 2)', '11600(Day 3)', '11700(Day 4)', '11600(Day 5)', '11700(Day 6)', '11600(Day 7)'];
  //public barChartLabels: Label[] = this.resultSPArray;
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    // data: this.resultCallArray
    // data: this.resultPutArray
    { data: [97.00, 117.00, 48.05, 31.60, 2.90, 90.20, 44.40], fill: false, label: 'ATM Call Values', datalabels: {
          anchor: 'start',
          align: 'start'
        }  },
    { data: [38.20, 27.35, 51.10, 28.95, 17.85, 36.20, 41.05], fill: false, label: 'ATM Put Values'
    , datalabels: {
          anchor: 'end',
          align: 'end'
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
