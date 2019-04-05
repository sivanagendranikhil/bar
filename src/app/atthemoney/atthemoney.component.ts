import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
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

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getData()
    .then(
      (stocks) => { 
        this.stocks = stocks 
        for(let res of this.stocks) {
          this.atmCallValue = res.atm[0]
          this.atmPutValue = res.atm[1]
          this.resultCallArray.push(this.atmCallValue)         
          this.resultPutArray.push(this.atmPutValue)       
          console.log(res.atm[2])
          console.log(res.atm[2] == 1) 
          if(res.atm[2] == 1) {
            this.count1 = this.count1 + 1
          }
          if(res.atm[2] == -1) {
            this.count2 = this.count2 + 1 
          }       
        }
        this.todayCallATM = this.stocks[this.stocks.length-1].atm[0]
        this.todayPutATM = this.stocks[this.stocks.length-1].atm[1]
        if(this.count1 > this.count2 && this.count1 > 2) {
          this.finalPredict = "Bullish";
          } else if(this.count1 < this.count2 && this.count2 > 2) {
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

  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.resultCallArray, fill: false, label: 'ATM Call Values' },
    { data: this.resultPutArray, fill: false, label: 'ATM Put Values' }
  ];


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
