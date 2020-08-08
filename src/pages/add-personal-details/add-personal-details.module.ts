import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPersonalDetailsPage } from './add-personal-details';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@NgModule({
  declarations: [
    AddPersonalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPersonalDetailsPage),
  ]
})
export class AddPersonalDetailsPageModule {}
