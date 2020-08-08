import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewAddressPage } from './add-new-address';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@NgModule({
  declarations: [
    AddNewAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewAddressPage),
  ]
})
export class AddNewAddressPageModule {}
