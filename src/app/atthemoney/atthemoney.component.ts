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
    { data: this.resultCallArray, label: 'ATM Call Values' },
    { data: this.resultPutArray, label: 'ATM Put Values' }
  ];


  // public barChartColors: Color[] = [
  //   { backgroundColor: '#3282B7' },
  //   { backgroundColor: '#F9AF8C' },
  // ]
  
}
