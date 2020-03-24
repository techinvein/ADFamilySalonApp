import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-track-order',
  templateUrl: 'track-order.html',
})
export class TrackOrderPage {
  allDetails:any;
  orders:any = [];
  currentUser:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.currentUser = firebase.auth().currentUser.uid;
   
    let orderDetails = this.navParams.get('data');
    if(orderDetails) {
      this.allDetails = orderDetails;
      this.orders = orderDetails.orders;
      console.log(this.allDetails)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackOrderPage');
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
               this.navCtrl.pop();
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
              console.log('Agree clicked');
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
}
