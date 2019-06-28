import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneNumberVerificationPage } from './phone-number-verification';

@NgModule({
  declarations: [
    PhoneNumberVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneNumberVerificationPage),
  ],
})
export class PhoneNumberVerificationPageModule {}
