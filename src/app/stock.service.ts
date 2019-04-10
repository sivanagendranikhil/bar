import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Headers } from '@angular/http';
import { MyData } from './premiumdecay/my-data';
import { OITodayData } from './openinterest/today-data';

@Injectable()
export class StockService {

 private headers = new Headers({'Content-Type': 'application/json'});

  constructor(public http:Http) { }

  getData(): Promise<MyData[]> {
    return this.http
    .get('http://localhost:3333/ProjectBackend/StockAPI/getDataFromDB')
    .toPromise()
    .then(resp => resp.json() as MyData[])
    .catch(this.errorHandler);
  }

  getOIData(): Promise<OITodayData[]> {
    return this.http
    .get('http://localhost:3333/ProjectBackend/StockAPI/getOIDataFromDB')
    .toPromise()
    .then(resp => resp.json() as OITodayData[])
    .catch(this.errorHandler);
  }

  getFinalPrediction(): Promise<Number[]> {
     return this.http
    .get('http://localhost:3333/ProjectBackend/StockAPI/getFinalPrediction')
    .toPromise()
    .then(resp => resp.json() as Number[])
    .catch(this.errorHandler);
  }

  getFinalPredictionFromWeb(): Promise<Number[]> {
     return this.http
    .get('http://localhost:3333/ProjectBackend/StockAPI/getFinalPredictionFromWeb')
    .toPromise()
    .then(resp => resp.json() as Number[])
    .catch(this.errorHandler);
  }

  private errorHandler(error:any): Promise<any> {
    console.log('Error occured',error);
    return Promise.reject(error.message || error);
  }
}