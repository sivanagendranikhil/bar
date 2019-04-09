import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { MyData } from './my-data';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  callPrediction: string;
  putPrediction: string;
  finalPrediction: string;
  strikePrice: Number;
  result: Number[];
  stocks: MyData[];
  message: string;
  atmTodayPredict: string;
  oiTodayPredict: string;
  pdTodayPredict: string;
  pcrTodayPredict: string;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getFinalPrediction()
      .then(
        (resp) => { 
          this.result = resp
          // STRIKE PRICE
          this.strikePrice = this.result[3]
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

      this.stockService.getData()
    .then(
      (stocks) => { 
        this.stocks = stocks 
        // ATM
        if(this.stocks[this.stocks.length-1].atm[2] == 1) {
          this.atmTodayPredict = "Bullish";
        } else if(this.stocks[this.stocks.length-1].atm[2] == -1) {
          this.atmTodayPredict = "Bearish";
        } else {
          this.atmTodayPredict = "Moving Sideways";
        }
        // OI 
         if(this.stocks[this.stocks.length-1].oi[2]>this.stocks[this.stocks.length-1].oi[3]&&this.stocks[this.stocks.length-1].oi[2] >= 2) {
          this.oiTodayPredict = "Bullish";
        } else if(this.stocks[this.stocks.length-1].oi[2] < this.stocks[this.stocks.length-1].oi[3] && this.stocks[this.stocks.length-1].oi[3] >= 2) {
          this.oiTodayPredict = "Bearish";
        } else {
          this.oiTodayPredict = "Moving Sideways";
        } 
        // Premium Decay
        if(this.stocks[this.stocks.length-1].premiumDecay[2] == 1) {
          this.pdTodayPredict = "Bullish";
        } else if(this.stocks[this.stocks.length-1].premiumDecay[2] == -1) {
          this.pdTodayPredict = "Bearish";
        } else {
          this.pdTodayPredict = "Moving Sideways";
        } 
        // Put Call Ratio
        if(this.stocks[this.stocks.length-1].pcr[1] == 1) {
            this.pcrTodayPredict = "Bullish";
          } else if(this.stocks[this.stocks.length-1].pcr[1] == -1) {
            this.pcrTodayPredict = "Bearish";
          } else {
            this.pcrTodayPredict = "Moving Sideways";
          } 
      },
      (resp) => { 
        this.message = resp.message;
        console.log('Error!!!') 
      }
    );
  }

}