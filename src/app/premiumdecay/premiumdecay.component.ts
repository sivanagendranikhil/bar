
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
