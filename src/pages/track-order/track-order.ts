import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { CallNumber } from '@ionic-native/call-number';
@IonicPage()
@Component({
  selector: 'page-track-order',
  templateUrl: 'track-order.html',
})
export class TrackOrderPage {
  allDetails:any;
  orders:any = [];
  currentUser:any;
  adminMobileNo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private callNumber: CallNumber, public loadingCtrl: LoadingController) {
    this.currentUser = firebase.auth().currentUser.uid;
   
    let orderDetails = this.navParams.get('data');
    if(orderDetails) {
      this.allDetails = orderDetails;
      this.orders = orderDetails.orders;
      console.log(this.allDetails)
    }
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log('ionViewDidLoad TrackOrderPage');
    firebase.database().ref('adminInfo/Mobile').once('value',(snap)=>{
      this.adminMobileNo = snap.val();
      loading.dismiss();
    })
  }
  cancelOrder(){
    if( this.allDetails.bookingStatus == 'PENDING'){
     const confirm = this.alertCtrl.create({
      title: 'Attention',
      message: 'Do you want to cancel Your order?',
      buttons: [
        {
          text: 'CANCEL',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'YES', 
          handler: () => {
            firebase.database().ref('users/' + this.currentUser + '/my_booking/' + this.allDetails.rootKey + '/').update({
              bookingStatus:'CANCEL'
             }).then(()=>{
              firebase.database().ref('bookings/' + this.allDetails.rootKey + '/').update({
                bookingStatus:'CANCEL'
               }).then(()=>{
                this.navCtrl.pop();
               })
               
             })
        
          }
        }
      ]
    });
    confirm.present();
    }else{
      const confirm = this.alertCtrl.create({
        title: 'Attention',
        message: 'SORRY!\nCancellation is not possible after order approved. For futher information please contact to authority.',
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'CALL NOW', 
            handler: () => {
              this.callNumber.callNumber(this.adminMobileNo, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
              // console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();

    }
  }
  reschedule(){
    if( this.allDetails.bookingStatus == 'PENDING' || this.allDetails.bookingStatus == 'ACCEPTED'){
      const confirm = this.alertCtrl.create({
        title: 'Attention',
        message: 'If you want to reschedule your order or any kind of help, you need contact AD Family Saloon through Call\n are you agree for call?',
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'CALL NOW', 
            handler: () => {
              this.callNumber.callNumber(this.adminMobileNo, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));

              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    } 
  }

  viewDetails(){
   this.navCtrl.push("ViewOrdersPage",{data:this.orders})
  }

  callNow() {
    this.callNumber.callNumber(this.allDetails.contact_person_mobile, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
