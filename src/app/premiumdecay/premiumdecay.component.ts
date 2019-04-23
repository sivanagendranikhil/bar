
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';
import { StockService } from '../stock.service';
import { MyData } from './my-data';

@Component({
  selector: 'app-premiumdecay',
  templateUrl: './premiumdecay.component.html',
  styleUrls: ['./premiumdecay.component.css']
})
export class PremiumdecayComponent implements OnInit {

  stocks: MyData[];
  message: string;
  pdCallValue: number;
  pdPutValue: number;
  callDecayAvg: number;
  putDecayAvg: number;
  count1: number = 0;
  count2: number = 0;
  finalPredict: string;
  todayPredict: string;
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
          this.pdCallValue = this.stocks[i].premiumDecay[0]
          this.pdPutValue = this.stocks[i].premiumDecay[1]
          this.resultCallArray.push(this.pdCallValue)
          this.resultPutArray.push(this.pdPutValue)
            //start
            this.spValue = this.stocks[i].sp[0];
            this.day = ' (Day'+this.count+')';
            this.resultSPArray.push(this.spValue + this.day) 
            this.count++;   
            //end
          if(this.stocks[i].premiumDecay[2] == 1)
            this.count1 = this.count1 + 1
          if(this.stocks[i].premiumDecay[2] == -1)
            this.count2 = this.count2 + 1    
        } 
        for(let res of this.stocks) {
          this.pdCallValue = res.premiumDecay[0]
          this.pdPutValue = res.premiumDecay[1]
          this.resultCallArray.push(this.pdCallValue)
          this.resultPutArray.push(this.pdPutValue)
          if(res.premiumDecay[2] == 1)
            this.count1 = this.count1 + 1
          if(res.premiumDecay[2] == -1)
            this.count2 = this.count2 + 1   
        } 
        this.callDecayAvg = this.stocks[this.stocks.length-1].premiumDecay[0]
        this.putDecayAvg = this.stocks[this.stocks.length-1].premiumDecay[1] 
        if(this.count1 > this.count2 && this.count1 > 3) {
          this.finalPredict = "Bullish";
          } else if(this.count1 < this.count2 && this.count2 > 3) {
            this.finalPredict = "Bearish";
          } else {
            this.finalPredict = "Moving Sideways";
          }

        if(this.stocks[this.stocks.length-1].premiumDecay[2] == 1) {
          this.todayPredict = "Bullish";
        } else if(this.stocks[this.stocks.length-1].premiumDecay[2] == -1) {
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

    this.todayPredict = "Bullish"
    this.callDecayAvg = -6.90
    this.putDecayAvg = -7.15

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
          anchor: 'start',
          align: 'start',
        }
      }
  };
  public barChartLabels: Label[] = ['11700(Day 1)', '11600(Day 2)', '11600(Day 3)', '11700(Day 4)', '11600(Day 5)', '11700(Day 6)', '11600(Day 7)'];
  // public barChartLabels: Label[] = this.resultSPArray;
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [-0.03, 0.20, 0.26, 1.88, -0.08, -11.82, -6.90], fill: false, label: 'Premium Decay Call Values', datalabels: {
          anchor: 'end',
          align: 'end'
        }  },
    { data: [14.21, -6.55, 4.00, -2.75, -0.60, -6.62, -7.15], fill: false, label: 'Premium Decay Put Values' }
  ];

  public barChartPlugins = [pluginDataLabels];

  public barChartColors: Color[] = [
    {
      borderColor: 'green',
      pointBorderColor: '#ffffff'
    },
    { 
      borderColor: 'red',
      pointBorderColor: '#ffffff'
    }
  ]
  
}
