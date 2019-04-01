import { Component, OnInit } from '@angular/core';
 import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
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
    oiCallValue: number;
    oiPutValue: number;
    resultCallArray:Array<number> = [];
    resultPutArray:Array<number> = [];

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
            this.resultCallArray.push(590000)
            this.resultCallArray.push(800000)
            this.resultCallArray.push(810000)
            this.resultCallArray.push(560000)
            this.resultCallArray.push(550000)
            this.resultCallArray.push(400000)
          
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
      { data: this.resultCallArray, label: 'Put-Call Ratio' },
    
    ];


    // public barChartColors: Color[] = [
    //   { backgroundColor: '#3282B7' },
    //   { backgroundColor: '#F9AF8C' },
    // ]






    
  }