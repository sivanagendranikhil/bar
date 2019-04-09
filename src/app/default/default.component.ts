import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  callPrediction: string;
  putPrediction: string;
  finalPrediction: string;
  result: Number[];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getFinalPrediction()
      .then(
        (resp) => { 
          this.result = resp
          // FINAL PREDICTION
          if(this.result[0] == 1) {
            this.finalPrediction = "Bullish"
          } else if(this.result[0] == -1) {
            this.finalPrediction = "Bearish"
          } else {
            this.finalPrediction = "Moving Sideways"
          }
          // CALLS PREDICTION
          if(this.result[1] == 1) {
            this.callPrediction = "Bullish"
          } else if(this.result[1] == -1) {
            this.callPrediction = "Bearish"
          } else {
            this.callPrediction = "Moving Sideways"
          }
          // PUTS PREDICTION
          if(this.result[2] == 1) {
            this.putPrediction = "Bullish"
          } else if(this.result[2] == -1) {
            this.putPrediction = "Bearish"
          } else {
            this.putPrediction = "Moving Sideways"
          }
        },
        (resp) => { 
          console.log('Error!!!') 
        }
      );
  }

}