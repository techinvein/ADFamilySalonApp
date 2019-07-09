import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPersonalDetailsPage } from './add-personal-details';

@NgModule({
  declarations: [
    AddPersonalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPersonalDetailsPage),
  ],
})
export class AddPersonalDetailsPageModule {}
