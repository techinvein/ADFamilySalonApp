import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-orders',
  templateUrl: 'view-orders.html',
})
export class ViewOrdersPage {
  myorders:any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let myorders = this.navParams.get('data');
    if(myorders) {
     this.myorders = myorders
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrdersPage');
  }

}
