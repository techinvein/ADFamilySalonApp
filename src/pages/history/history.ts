import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public ordersegment:any = "current";
  public showableData:any = [];
  public currentUser:any;
  allItems={
    current:[],
    complete:[]
  }

    // NEW ACCEPTED START END
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public globalService: GlobalServiceProvider, public modalCtrl: ModalController,) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.currentUser = this.globalService.firebaseUid;
    firebase.database().ref('users/' + this.currentUser + '/my_booking/').on('value',(snap)=>{
      if(snap.val()) {
        let allBookings = snap.val();
        console.log(snap.val())
        var current = [];
        var complete = [];
        this.allItems={
          current:[],
          complete:[]
          }
        for(let key in allBookings){
          if(allBookings[key].bookingStatus == 'END' || allBookings[key].bookingStatus == 'CANCEL'){
            allBookings[key].rootKey = key;
            allBookings[key].totalOrders =  allBookings[key].orders.length;
            allBookings[key].orderImage =  allBookings[key].orders[0].image;
            allBookings[key].subcat_name = allBookings[key].orders[0].subcat_name
            complete.push(allBookings[key])
          }else{
            allBookings[key].rootKey = key;
            allBookings[key].totalOrders =  allBookings[key].orders.length;
            allBookings[key].orderImage =  allBookings[key].orders[0].image;
            allBookings[key].subcat_name = allBookings[key].orders[0].subcat_name
            current.push(allBookings[key])
          }
        }
        console.log(this.allItems, current, complete)
        if(current){
          if(this.ordersegment == "current") {
            this.showableData = current.reverse();
          }
          this.allItems.current = current
          loading.dismiss();
        }
        if(complete){
          this.allItems.complete = complete.reverse();
          if(this.ordersegment == "complete") {
            this.showableData = this.allItems.complete;
          }
          loading.dismiss();
        }
       
      }
      else {
        loading.dismiss();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
  segmentChange(value){
    let vv = value;
    this.showableData = this.allItems[vv];
  }
  
  trackOrder(item){
    console.log(item)
    this.navCtrl.push("TrackOrderPage",{data:item})
  }

  viewOrder(){

  }
  checkout(){
    this.navCtrl.push("CartPage");
  }

  openReviewModal(item) {
    let reviewModal = this.modalCtrl.create('ReviewModalPage',  { orderData: item });
    reviewModal.present();
  }

  openThankYouForFeedbackModal() {
    
  }
}
