import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlotBookingPage } from './slot-booking';

@NgModule({
  declarations: [
    SlotBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(SlotBookingPage),
  ],
})
export class SlotBookingPageModule {}
