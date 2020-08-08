import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@IonicPage()
@Component({
  selector: 'page-add-personal-details',
  templateUrl: 'add-personal-details.html',
})
export class AddPersonalDetailsPage {
  type:any;
  firstName: any;
  lastName: any;
  email: any;
  address: any;
  userDetails: any;
  unregister: any;
  colors: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalServiceProvider, public viewCtrl:ViewController, public platform: Platform) {
    // this.userDetails = this.navParams.get('signIndetails');
    // console.log(this.userDetails);
    this.unregister = this.platform.registerBackButtonAction( () => {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonalDetailsPage');
    console.log('uid',this.globalService.firebaseUid);
  }

  change(data){
    this.type = data;
  }

  clickContinue(){
    if(this.firstName && this.lastName) {
      firebase.database().ref('users/' + this.globalService.firebaseUid + '/').set({
        active: true,
        email: this.email,
        mobile_number: this.globalService.phoneNumber,
        name: this.firstName+ " " +this.lastName,
        firstName: this.firstName,
        lastName: this.lastName,
        type: "user"
      }).then(()=>{
        this.unregister();
        this.viewCtrl.dismiss();
        // this.navCtrl.setRoot("HomePage");
      })
    }
    else {
      alert('Please Provide First Name and Last Name')
    }

  }

}
