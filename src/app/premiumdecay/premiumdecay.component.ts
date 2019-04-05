
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
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

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getData()
    .then(
      (stocks) => { 
        this.stocks = stocks 
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
        if(this.count1 > this.count2 && this.count1 > 2) {
          this.finalPredict = "Bullish";
          } else if(this.count1 < this.count2 && this.count2 > 2) {
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

  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.resultCallArray, label: 'Premium Decay Call Values' },
    { data: this.resultPutArray, label: 'Premium Decay Put Values' }
  ];


  // public barChartColors: Color[] = [
  //   { backgroundColor: '#3282B7' },
  //   { backgroundColor: '#F9AF8C' },
  // ]
  
}
