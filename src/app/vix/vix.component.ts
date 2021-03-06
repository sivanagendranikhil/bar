import { Component, OnInit } from '@angular/core';
 import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';
import { StockService } from '../stock.service';
import{MyData} from  './my-data';


@Component({
  selector: 'app-vix',
  templateUrl: './vix.component.html',
  styleUrls: ['./vix.component.css']
})

export class VixComponent implements OnInit {
    stocks: MyData[];
    message: string;
    vixValue: number;
    todayVIX: number;
    count1: number = 0;
    count2: number = 0;
    finalPredict: string;
    todayPredict: string;    
    resultCallArray:Array<number> = [];
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
            this.vixValue = this.stocks[i].vix[0]
            this.resultCallArray.push(this.vixValue) 
            this.spValue = this.stocks[i].sp[0]
            this.day = ' (Day'+this.count+')';
            this.resultSPArray.push(this.spValue + this.day) 
            this.count++;   
          if(this.stocks[i].vix[1] == 1)
            this.count1 = this.count1 + 1
          if(this.stocks[i].vix[1] == -1)
            this.count2 = this.count2 + 1       
          }
          this.todayVIX = this.stocks[this.stocks.length-1].vix[0]
          if(this.count1 > this.count2 && this.count1 > 2) {
          this.finalPredict = "Bullish";
          } else if(this.count1 < this.count2 && this.count2 > 2) {
            this.finalPredict = "Bearish";
          } else {
            this.finalPredict = "Moving Sideways";
          }

          if(this.stocks[this.stocks.length-1].vix[1] == 1) {
            this.todayPredict = "Bullish";
          } else if(this.stocks[this.stocks.length-1].vix[1] == -1) {
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

      this.todayVIX = 21.38

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
          align: 'end',
        }
      }
    };
    public barChartLabels1: Label[] = ['11700(Day 1)', '11600(Day 2)', '11600(Day 3)', '11700(Day 4)', '11600(Day 5)', '11700(Day 6)', '11600(Day 7)'];
    //public barChartLabels1: Label[] = this.resultSPArray;
    public barChartType: ChartType = 'line';
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [
      { data: [18.47, 20.43, 20.32, 21.09, 20.95, 20.99, 21.38], fill: false, label: 'VIX Parameter'},
       
    
    ];

    public barChartPlugins = [pluginDataLabels];

   public barChartColors: Color[] = [
    { 
      borderColor: 'green',
      pointBorderColor: '#fff'
    }
  ]
   
  }
