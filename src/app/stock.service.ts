import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Headers } from '@angular/http';
import { MyData } from './premiumdecay/my-data';

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

  private errorHandler(error:any): Promise<any> {
    console.log('Error occured',error);
    return Promise.reject(error.message || error);
  }
}