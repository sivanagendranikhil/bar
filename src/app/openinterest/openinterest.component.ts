

  import { Component, OnInit } from '@angular/core';
  import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import * as pluginDataLabels from 'chartjs-plugin-datalabels';
  import { Label, Color } from 'ng2-charts';
  import { StockService } from '../stock.service';
  import { MyData } from './my-data';
  import { OITodayData } from './today-data';
@Component({
  selector: 'app-openinterest',
  templateUrl: './openinterest.component.html',
  styleUrls: ['./openinterest.component.css']
})
export class OpeninterestComponent implements OnInit {
   
    stocks: MyData[];
    oiData: OITodayData[];
    message: string;
    oiCallValue: number;
    oiPutValue: number;
    strikePrice: number;
    callOIChange: number;
    putOIChange: number;
    todayCallOIChngATM: number;
    todayPutOIChngATM: number;
    count1: number = 0;
    count2: number = 0;
    finalPredict: string;
    todayPredict: string;
    resultCallArray:Array<number> = [];
    resultPutArray:Array<number> = [];
    resultOIStrikePriceArray:Array<number> = [];
    resultCallOIChangeArray:Array<number> = [];
    resultPutOIChangeArray:Array<number> = [];
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
            this.oiCallValue = this.stocks[i].oi[0]
            this.oiPutValue = this.stocks[i].oi[1]
            this.resultCallArray.push(this.oiCallValue)
            this.resultPutArray.push(this.oiPutValue)   
                   //start
            this.spValue = this.stocks[i].sp[0];
            this.day = ' (Day'+this.count+')';
            this.resultSPArray.push(this.spValue + this.day) 
            this.count++;   
            //end
            this.count1 = this.stocks[i].oi[2]
            this.count2 = this.stocks[i].oi[3] 
          }
          this.todayCallOIChngATM = this.stocks[this.stocks.length-1].oi[0]
          this.todayPutOIChngATM = this.stocks[this.stocks.length-1].oi[1] 
          if(this.count1 > this.count2) {
          this.finalPredict = "Bullish";
          } else if(this.count1 < this.count2) {
            this.finalPredict = "Bearish";
          } else {
            this.finalPredict = "Moving Sideways";
          }

        if(this.stocks[this.stocks.length-1].oi[2]>this.stocks[this.stocks.length-1].oi[3]&&this.stocks[this.stocks.length-1].oi[2] >= 2) {
          this.todayPredict = "Bullish";
        } else if(this.stocks[this.stocks.length-1].oi[2] < this.stocks[this.stocks.length-1].oi[3] && this.stocks[this.stocks.length-1].oi[3] >= 2) {
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
      this.stockService.getOIData()
      .then(
        (oiData) => {
          this.oiData = oiData
          for(let i=this.oiData.length-7; i<this.oiData.length; i++) {
            this.strikePrice = this.oiData[i].strikePrice
            this.callOIChange = this.oiData[i].callOIChangeValue
            this.putOIChange = this.oiData[i].putOIChangeValue
            this.resultOIStrikePriceArray.push(this.strikePrice)
            this.resultCallOIChangeArray.push(this.callOIChange)
            this.resultPutOIChangeArray.push(this.putOIChange)
          }  
        },
        (resp) => { 
          this.message = resp.message;
          console.log('Error!!!') 
        }
      );
      this.todayPredict = "Bullish"
      this.todayCallOIChngATM = 365400
      this.todayPutOIChngATM = 562425
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
    public barChartLabels: Label[] = ['11700(Day 1)', '11600(Day 2)', '11600(Day 3)', '11700(Day 4)', '11600(Day 5)', '11700(Day 6)', '11600(Day 7)'];
    //public barChartLabels: Label[] = this.resultSPArray;
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;

    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [
      { data: [109875, 18750, 253725, 530175, 3054975, 46725, 365400], label: 'OI Call Values' },
      { data: [405300, 135525, 151875, -513750, 56700, 884925, 562425], label: 'OI Put Values' }
    ];


    public barChartColors: Color[] = [
      { backgroundColor: 'green' },
      { backgroundColor: 'red' },
    ]



     public barChartOptions1: ChartOptions = {
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
    public barChartLabels1: number[] = [11450, 11500, 11550, 11600, 11650, 11700] //this.resultOIStrikePriceArray;
    public barChartType1: ChartType = 'bar';
    public barChartLegend1= true;

    public barChartData1: ChartDataSets[] = [
      // data: this.resultCallOIChangeArray
      // data: this.resultPutOIChangeArray
      { data: [1800, 56925, 31350, 344325, 439875, 1382100, -183675], barChartLabels: this.resultCallOIChangeArray, label: 'OI Call Values' },
      { data: [37950, 625950, 324525, 1091550, 288000, 112425, -17475], label: 'OI Put Values' }
    ];

    public barChartColors1: Color[] = [
      { backgroundColor: 'green' },
      { backgroundColor: 'red' },
    ]
    
  }
