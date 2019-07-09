import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

/*  ion-item pencil icon function. 
    Please change individual function name for every pencil icon 
*/
clickCM(){
  alert("Edit icon clicked..")
}

uploadCam(){
  alert("Functionality no implemented yet.")
}
checkout(){
  this.navCtrl.push("CartPage");
}

}
