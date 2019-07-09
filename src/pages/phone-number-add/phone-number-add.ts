import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-phone-number-add',
  templateUrl: 'phone-number-add.html',
})
export class PhoneNumberAddPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneNumberAddPage');
  }

  clickContinue(){
    this.navCtrl.push("PhoneNumberVerificationPage");
  }

}
