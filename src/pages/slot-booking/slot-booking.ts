import { Component } from '@angular/core';
import { IonicPage, NavController,ActionSheetController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the SlotBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slot-booking',
  templateUrl: 'slot-booking.html',
})
export class SlotBookingPage {
  myDate:any;
  fromTime:any;
  toTime:any;
  fromTimeSlot:any;
  toTimeSlot:any;
  data:any;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.myDate = '2019-07-09';
    
   
   
    
  }
  pay(){
    this.viewCtrl.dismiss();
    let profileModal = this.modalCtrl.create('ItemDetailsPage', { userId: 8675309 });
    profileModal.present();
    
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad SlotBookingPage');
    this.fromTime =['9:00 AM - 10:00 AM','10:00 AM - 11:00 AM','11:00 AM - 12:00 PM','12:00 PM - 01:00 PM','01:00 PM - 02:00 PM','02:00 PM - 03:00 PM','03:00 PM - 04:00 PM','04:00 PM - 05:00 PM','05:00 PM - 06:00 PM','06:00 PM - 07:00 PM','07:00 PM - 08:00 PM','08:00 PM - 09:00 PM',]
    this.toTime =['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM',,'5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM',,'8:00 PM','8:30 PM','9:00 PM',]
    this.fromTimeSlot = '0'
    this.toTimeSlot = 2
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

 

}
