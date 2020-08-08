import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';


@IonicPage()
@Component({
  selector: 'page-phone-number-verification',
  templateUrl: 'phone-number-verification.html',
})
export class PhoneNumberVerificationPage {
  value:number=120;
  verificationCode: any;
  verificationDetails: any;
  countdownSec: number = 120
  phoneNumber: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseAuthentication: FirebaseAuthentication,
    public loadingCtrl: LoadingController
  ) {
    this.verificationDetails = this.navParams.get('details');
    this.phoneNumber = this.navParams.get('phoneNumber');
    console.log(this.verificationDetails);
    
    this.countdowntimer(this.countdownSec);
  }

  ionViewDidEnter() {
      setInterval(() => {
        if(this.value >0){
          this.value = this.value-1;
        }
      }, 1000);
  }

  seconds;
  minutes;
  hours;
  clockDisplay: string;
  interval: number;
  countdowntimer(duration) {
    if (duration > 0) {
      setInterval(() => {
        duration = duration - 1;
        if (duration <= 0) {
          return;
        }

        if (duration % 60 < 10) {
          this.seconds = '0' + parseInt("" + duration % 60);
        } 
        else {
          this.seconds = '' + parseInt((duration % 60).toString());
        }

        if (duration / 60 < 10) {
          this.minutes = '' + parseInt("" + duration / 60, 10);
        } 
        else {
          this.minutes = '' + parseInt((duration / 60).toString(), 10);
        }
        
        if (duration / 3600 < 10) {
          this.hours = "" + parseInt("" + duration / 3600);
        } 
        else {
          this.hours = "" + parseInt((duration / 3600).toString())
        }

        if (this.minutes >= 60) {
          this.minutes = parseInt("" + this.minutes % 60);
        }

        this.clockDisplay = this.minutes + ":" + this.seconds;
        if (this.hours == 0 && this.minutes == 0 && this.seconds == 1) {
        //write ur code........
        }
      }, 1000);
    }
  }

  // resendButtonClick(){
  //   alert("Code successfully sent to your mobile number");
  // }

  resendClick() {
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    }); 
    loading.present();

    this.firebaseAuthentication.verifyPhoneNumber(`+91${this.phoneNumber}`, 120000)
    .then((res: any) => {
      console.log("phoneid",res);
      loading.dismiss();
      this.value = 120;
      this.countdowntimer(this.countdownSec);
    })
    .catch((error: any) => {
      console.log(error);
      loading.dismiss();
      alert(error)
    });
  }

  clickContinue(){
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    }); 
    loading.present();

    this.firebaseAuthentication.signInWithVerificationId(this.verificationDetails, this.verificationCode)
    .then((res: any) => {
      console.log('verifyStatus',res);
      loading.dismiss();
      // this.navCtrl.push("AddPersonalDetailsPage", {signIndetails: res});
    })
    .catch((error: any) => {
      console.log(error);
      loading.dismiss();
      alert(error)
    });
  }



}
