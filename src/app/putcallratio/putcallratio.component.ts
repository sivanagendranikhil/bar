
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { StockService } from '../stock.service';
import{MyData} from  './my-data';

@Component({
  selector: 'app-putcallratio',
  templateUrl: './putcallratio.component.html',
  styleUrls: ['./putcallratio.component.css']
})
export class PutcallratioComponent implements OnInit {
    stocks: MyData[];
    message: string;
    pcrValue1: number;
    resultPcrArray:Array<number> = [];

    constructor(private stockService: StockService) { }

    ngOnInit() {
      this.stockService.getData()
      .then(
        (stocks) => { 
          this.stocks = stocks 
          for(let res of this.stocks) {
            this.pcrValue1 = res.pcr
            this.resultPcrArray.push(this.pcrValue1)
            this.resultPcrArray.push(5)
            this.resultPcrArray.push(8)
            this.resultPcrArray.push(7)
            this.resultPcrArray.push(5.1)
            this.resultPcrArray.push(5.5)
            this.resultPcrArray.push(4)
          
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
      { data: this.resultPcrArray, label: 'Put-Call Ratio' },
    
    ];


    // public barChartColors: Color[] = [
    //   { backgroundColor: '#3282B7' },
    //   { backgroundColor: '#F9AF8C' },
    // ]






    
  }
