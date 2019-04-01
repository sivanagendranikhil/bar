import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PremiumdecayComponent } from './premiumdecay/premiumdecay.component';
import { StockService } from './stock.service';
import { OpeninterestComponent } from './openinterest/openinterest.component';
import { ImpliedvolatalityComponent } from './impliedvolatality/impliedvolatality.component';
import { PutcallratioComponent } from './putcallratio/putcallratio.component';
import { VixComponent } from './vix/vix.component';
import { AtthemoneyComponent } from './atthemoney/atthemoney.component';
import { SupportresistanceComponent } from './supportresistance/supportresistance.component';
import { DefaultComponent } from './default/default.component';

import { AppRoutingModule } from './approuting.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ChartsModule, HttpModule,AppRoutingModule],
  declarations: [ AppComponent, HelloComponent, PremiumdecayComponent, OpeninterestComponent, ImpliedvolatalityComponent, PutcallratioComponent, VixComponent, AtthemoneyComponent, SupportresistanceComponent, DefaultComponent ],
  bootstrap:    [ AppComponent ],
  providers: [StockService]
})
export class AppModule { }
