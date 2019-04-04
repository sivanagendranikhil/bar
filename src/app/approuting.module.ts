import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{AtthemoneyComponent} from './atthemoney/atthemoney.component'
import{ImpliedvolatalityComponent} from './impliedvolatality/impliedvolatality.component'
import {PutcallratioComponent} from './putcallratio/putcallratio.component'
import {VixComponent} from './vix/vix.component'
import {OpeninterestComponent} from './openinterest/openinterest.component'
import {SupportresistanceComponent} from './supportresistance/supportresistance.component'
import {PremiumdecayComponent} from './premiumdecay/premiumdecay.component'
import{ DefaultComponent} from './default/default.component'



const routes: Routes = [
  {
    path: '',
    redirectTo: '/default',
    pathMatch: 'full'
  },
  {
    path:'default',
    component: DefaultComponent,
  },

  {
    path: 'atthemoney',
    component: AtthemoneyComponent,
  },
  {
    path: 'impliedvolatality',
    component: ImpliedvolatalityComponent,
  },
   {
    path: 'putcallratio',
    component:PutcallratioComponent ,
  },
   {
    path: 'vix',
    component: VixComponent,
  },
   {
    path: 'openinterest',
    component: OpeninterestComponent,
  },
   {
    path: 'supportresistance',
    component: SupportresistanceComponent,
  },
   {
    path: 'premiumdecay',
    component: PremiumdecayComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }