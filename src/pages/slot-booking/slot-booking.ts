import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,ActionSheetController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import * as firebase from 'firebase';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
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
  selectedTimeSlot:any = 0;
  TimeSlots:any;
  data:any;
  currentDate:any;
  orderData:any;
  maxdate:any;
  currentUser:any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController, public navParams: NavParams,public viewCtrl:ViewController, public globalService: GlobalServiceProvider) {
    var d = new Date();
    let date = d.getDate() >10?d.getDate():'0'+d.getDate()
    let mm = d.getMonth()+1;
    let month =  mm>10?mm:'0'+mm
    let year = d.getFullYear();
    this.currentDate = year + '-'+ month + '-'+ date;;
    this.myDate =  year + '-'+ month + '-'+ date;
    this.maxdate =  year + '-'+ '12' + '-'+ '31';
    let orderDetails = this.navParams.get('orderData');
    if(orderDetails) {
      this.orderData = orderDetails
      console.log(this.orderData)
    }
    this.currentUser = this.globalService.firebaseUid;
  }
  bookNow(){
    this.viewCtrl.dismiss().then(()=>{
    let loading = this.loadingCtrl.create({
      content: 'Request For Booking...'
    }); 
    loading.present();

    let d = new Date();
    let n = d.getTime();
    let bookingData = {
      bookingId:'ADFS'+'/'+ n,
      bookingDate:this.myDate,
      bookingTimeStamp: new Date(this.myDate).toString(),
      bookingTime:this.TimeSlots[this.selectedTimeSlot],
      orderCreatedDate:new Date().toString(),
      orderAddress:this.orderData.orderAddres,
      bookingStatus:'PENDING',
      userUId:this.orderData.orderAddres.userUID,
      orders: this.orderData.orders,
      orderPrice:this.orderData.orderPrice
    }
     console.log(bookingData)
      if(bookingData){
        firebase.database().ref('users/' + this.currentUser + '/my_booking/').push(bookingData).then((res)=>{
          console.log(res.key)
          firebase.database().ref('bookings/'+res.key).set(bookingData).then(()=>{
            firebase.database().ref('users/' + this.currentUser + '/cart/').remove();
            loading.dismiss();
            let profileModal = this.modalCtrl.create('ItemDetailsPage', { bookingData: bookingData });
            profileModal.present();
          })
        })
        
      }
    });
  }
 
  ionViewDidLoad() {
    this.TimeSlots =['9:00 AM - 12:00 PM','12:00 PM - 03:00 PM','03:00 PM - 06:00 PM','06:00 PM - 09:00 PM',]
    
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

 

}
