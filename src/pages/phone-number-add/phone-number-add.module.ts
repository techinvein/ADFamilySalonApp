import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneNumberAddPage } from './phone-number-add';

@NgModule({
  declarations: [
    PhoneNumberAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneNumberAddPage),
  ],
})
export class PhoneNumberAddPageModule {}
