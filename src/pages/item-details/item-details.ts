import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  allItems=[1,1,1,1,1,1,1,1,1,1,1]
  constructor(public navCtrl: NavController,public viewCtrl:ViewController,public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }

  trackNow(){
    this.viewCtrl.dismiss().then(()=>{
      this.navCtrl.push('TrackOrderPage');
    });
    
  }

  continueShop(){
    this.viewCtrl.dismiss()
    this.navCtrl.setRoot('HomePage')
  }
  dismiss(){
    this.viewCtrl.dismiss()
  }

}
