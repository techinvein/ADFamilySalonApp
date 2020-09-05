import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

/**
 * Generated class for the ReviewModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-modal',
  templateUrl: 'review-modal.html',
})
export class ReviewModalPage {
  rating: any = 5;
  review: any = "";
  orderData: any;
  currentUser: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalServiceProvider, public modalCtrl: ModalController, public viewCtrl:ViewController, private toastCtrl: ToastController) {
    this.orderData = this.navParams.get('orderData');
    this.currentUser = this.globalService.firebaseUid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewModalPage');
  }

  logRatingChange(rating){
    console.log("changed rating: ",rating);
    // do your stuff
    this.rating = rating;
  }

  submitReview() {
    if(this.rating) {
      console.log(this.rating, this.review, this.orderData);
      let reviewData = {
        rating: this.rating,
        review: this.review
      }

      if(this.currentUser) {
        firebase.database().ref('users/' + this.currentUser + '/my_booking/' + this.orderData.rootKey + '/').update(reviewData).then((res)=>{
          firebase.database().ref('bookings/'+ this.orderData.rootKey + '/').update(reviewData).then(()=>{
            this.viewCtrl.dismiss(reviewData);
            let toast = this.toastCtrl.create({
              message: 'Thanks your feedback!',
              duration: 2000,
              position: 'bottom'
            });
          
            toast.present();
          })
        })
      }
    }
  }

  closeModal() {
    this.viewCtrl.dismiss()
  }

}
