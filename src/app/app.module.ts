import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PremiumdecayComponent } from './premiumdecay/premiumdecay.component';
import { StockService } from './stock.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ChartsModule, HttpModule ],
  declarations: [ AppComponent, HelloComponent, PremiumdecayComponent ],
  bootstrap:    [ AppComponent ],
  providers: [StockService]
})
export class AppModule { }
