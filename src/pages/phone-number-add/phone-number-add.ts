import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';

@IonicPage()
@Component({
  selector: 'page-phone-number-add',
  templateUrl: 'phone-number-add.html',
})
export class PhoneNumberAddPage {
  phoneNumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseAuthentication: FirebaseAuthentication, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneNumberAddPage');
  }

  phoneNoVerify() {
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    }); 
    loading.present();

    this.firebaseAuthentication.verifyPhoneNumber(`+91${this.phoneNumber}`, 120000)
    .then((res: any) => {
      console.log("phoneid",res);
      loading.dismiss();
      this.navCtrl.push("PhoneNumberVerificationPage", {details: res, phoneNumber: this.phoneNumber});
    })
    .catch((error: any) => {
      console.log(error);
      loading.dismiss();
      alert(error)
    });
  }

  clickContinue(){
    this.navCtrl.push("PhoneNumberVerificationPage");
  }

}
