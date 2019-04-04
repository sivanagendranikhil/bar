 import { Component, OnInit } from '@angular/core';
  import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import { Label, Color } from 'ng2-charts';
  import { StockService } from '../stock.service';
 import { MyData } from './my-data';
@Component({
  selector: 'app-impliedvolatality',
  templateUrl: './impliedvolatality.component.html',
  styleUrls: ['./impliedvolatality.component.css']
})
export class ImpliedvolatalityComponent implements OnInit {

    stocks: MyData[];
    message: string;
    oiCallValue: number;
    oiPutValue: number;
    todayCallIV: number;
    todayPutIV: number;
    resultCallArray:Array<number> = [];
    resultPutArray:Array<number> = [];

    constructor(private stockService: StockService) { }

    ngOnInit() {
      this.stockService.getData()
      .then(
        (stocks) => { 
          this.stocks = stocks 
          for(let res of this.stocks) {
            this.oiCallValue = res.iv[0]
            this.oiPutValue = res.iv[1]
            this.resultCallArray.push(this.oiCallValue)
            this.resultPutArray.push(this.oiPutValue)
          }       
          this.todayCallIV = this.stocks[this.stocks.length-1].iv[0]
          this.todayPutIV = this.stocks[this.stocks.length-1].iv[1] 
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
      { data: this.resultCallArray, label: 'IV Call Values' },
      { data: this.resultPutArray, label: 'IV Put Values' }
    ];


    // public barChartColors: Color[] = [
    //   { backgroundColor: '#3282B7' },
    //   { backgroundColor: '#F9AF8C' },
    // ]






    
  }
