import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-add-personal-details',
  templateUrl: 'add-personal-details.html',
})
export class AddPersonalDetailsPage {
  type:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonalDetailsPage');
  }

  change(data){
    this.type = data;
  }

  clickContinue(){
    this.navCtrl.setRoot("HomePage");
  }

}
