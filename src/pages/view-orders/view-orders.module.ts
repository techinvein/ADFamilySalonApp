import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewOrdersPage } from './view-orders';

@NgModule({
  declarations: [
    ViewOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewOrdersPage),
  ],
})
export class ViewOrdersPageModule {}
