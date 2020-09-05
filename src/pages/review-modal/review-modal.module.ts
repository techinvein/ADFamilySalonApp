import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewModalPage } from './review-modal';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    ReviewModalPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(ReviewModalPage),
  ],
})
export class ReviewModalPageModule {}
