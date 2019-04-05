

  import { Component, OnInit } from '@angular/core';
  import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
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

    constructor(private stockService: StockService) { }

    ngOnInit() {
      this.stockService.getData()
      .then(
        (stocks) => { 
          this.stocks = stocks 
          for(let res of this.stocks) {
            this.oiCallValue = res.oi[0]
            this.oiPutValue = res.oi[1]
            this.resultCallArray.push(this.oiCallValue)
            this.resultPutArray.push(this.oiPutValue)   
            this.count1 = res.oi[2]
            this.count2 = res.oi[3] 
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

        if(this.stocks[this.stocks.length-1].oi[2] > this.stocks[this.stocks.length-1].oi[3] && this.stocks[this.stocks.length-1].oi          [2] >= 2) {
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
    }

    public barChartOptions: ChartOptions = {
      responsive: true,
    };
    public barChartLabels: Label[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [
      { data: this.resultCallArray, label: 'OI Call Values' },
      { data: this.resultPutArray, label: 'OI Put Values' }
    ];


    public barChartColors: Color[] = [
      { backgroundColor: '#6B8E23' },
      { backgroundColor: '#343a40' },
    ]




     public barChartOptions1: ChartOptions = {
      responsive: true,
    };
    public barChartLabels1: number[] = this.resultOIStrikePriceArray;
    public barChartType1: ChartType = 'bar';
    public barChartLegend1= true;

    public barChartData1: ChartDataSets[] = [
      { data: this.resultCallOIChangeArray, label: 'OI Call Values' },
      { data: this.resultPutOIChangeArray, label: 'OI Put Values' }
    ];


    public barChartColors1: Color[] = [
      { backgroundColor: '#6B8E23' },
      { backgroundColor: '#343a40' },
    ]
    
  }
