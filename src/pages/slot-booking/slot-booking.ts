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

  paymentMethod: any;
  onlineOrderId: any;
  firstName: any;
  lastName: any;
  mobileNumber: any;
  email: any = "";

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
    this.paymentMethod = this.navParams.get('paymentMethod');
    if(orderDetails) {
      this.orderData = orderDetails
      console.log(this.orderData)
    }
    this.currentUser = this.globalService.firebaseUid;
  }

  loadProfileDetails() {
    let currentUser = this.globalService.firebaseUid;
    if(currentUser) {
      firebase.database().ref('users/' + currentUser + '/').once('value',(snap)=>{
        console.log('userDetails',snap.val());
        if(snap.val()) {
          let userDetails = snap.val();
          this.firstName = userDetails.firstName;
          this.lastName = userDetails.lastName;
          this.mobileNumber = userDetails.mobile_number;
          if(userDetails.email) {
            this.email = userDetails.email;
          }
        }
      })
    }
  }

  paySelect() {
    if(this.paymentMethod == 'Online Payment') {
      this.payWithRazorpay();
    }
    else {
      this.bookNow(null);
    }
  }


  bookNow(payment_id){
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
      paymentMethod: this.paymentMethod,
      onlinePaymentStatus: payment_id ? 'PAID' : 'UNPAID',
      paymentId: payment_id,
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

    this.loadProfileDetails();
    
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

 /////////////////////////////////////////////////
  payWithRazorpay() {
    let d = new Date();
    let n = d.getTime();
    this.onlineOrderId = 'ADFS'+'/'+ n;

    var options = {
      description: 'Prepaid service',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_RRmcFbiJMHpzWZ',
      amount: this.orderData.orderPrice * 100,
      name: 'AD Family Salon Academy',
      // order_id: this.onlineOrderId,
      payment_capture: 1,
      prefill: {
        email: this.email,
        contact: this.mobileNumber,
        name: this.firstName + " " + this.lastName
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = (payment_id) => {
      // alert('payment_id: ' + payment_id);
      this.bookNow(payment_id);
      //Navigate to another page using the nav controller
      //this.navCtrl.setRoot(SuccessPage)
      //Inject the necessary controller to the constructor
    };

    var cancelCallback = (error) => {
      alert(error.description + ' (Error ' + error.code + ')');
      //Navigate to another page using the nav controller
      //this.navCtrl.setRoot(ErrorPage)
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

}
