
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import * as pluginDataLabels from 'chartjs-plugin-datalabels';
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
    pcrValue: number;
    todayPCR: number;
    count1: number = 0;
    count2: number = 0;
    finalPredict: string;
    todayPredict: string;
    resultPcrArray:Array<number> = [];

    constructor(private stockService: StockService) { }

    ngOnInit() {
      this.stockService.getData()
      .then(
        (stocks) => { 
          this.stocks = stocks 
          for(let i = this.stocks.length-7; i < this.stocks.length; i++) {
            this.pcrValue = this.stocks[i].pcr[0]
            this.resultPcrArray.push(this.pcrValue)
            if(this.stocks[i].pcr[1] == 1)
              this.count1 = this.count1 + 1
            if(this.stocks[i].pcr[1] == -1)
              this.count2 = this.count2 + 1   
          }
          this.todayPCR = this.stocks[this.stocks.length-1].pcr[0]
          if(this.count1 > this.count2 && this.count1 > 3) {
          this.finalPredict = "Bullish";
          } else if(this.count1 < this.count2 && this.count2 > 3) {
            this.finalPredict = "Bearish";
          } else {
            this.finalPredict = "Moving Sideways";
          }
          if(this.stocks[this.stocks.length-1].pcr[1] == 1) {
            this.todayPredict = "Bullish";
          } else if(this.stocks[this.stocks.length-1].pcr[1] == -1) {
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
       plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    public barChartLabels: Label[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    public barChartType: ChartType = 'line';
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [
      { data: this.resultPcrArray, fill: false, label: 'Put-Call Ratio' },
    
    ];

    
  public barChartPlugins = [pluginDataLabels];

   public barChartColors: Color[] = [
    { 
      borderColor: 'green',
      pointBorderColor: '#fff'
    }
  ]






    
  }
