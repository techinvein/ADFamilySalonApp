import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import * as firebase from 'firebase';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
@IonicPage()
@Component({
  selector: 'page-add-new-address',
  templateUrl: 'add-new-address.html',
})
export class AddNewAddressPage {
  address={
    fullName:'',
    mobileNo:'',
    altMobileNo:'',
    Pincode:'',
    flatOrHouseNo:'',
    streetOrLocality:'',
    landmark:'',
    city:'Kolkata',
    userUID:''
  }
  orderData:any;
  price:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public modalCtrl: ModalController, public globalService: GlobalServiceProvider) {
    this.loadUserData()
    let orderDetails = this.navParams.get('orderData');
    let orderPrice = this.navParams.get('orderPrice');
    if(orderDetails && orderPrice) {
      this.price = orderPrice
      this.orderData = orderDetails
    }
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  loadUserData(){
    let currentUser = this.globalService.firebaseUid;
    if(currentUser) {
      firebase.database().ref('users/' + currentUser).once('value',(snap)=>{
        console.log(snap.val());
        if(snap.val()) {
          let userData = snap.val();
          this.address.fullName = snap.val().name;
          this.address.mobileNo = snap.val().mobile_number;
          this.address.userUID = currentUser;
        }
      })
    }
  }
 
  addAddress(){
    if(this.address.fullName == '' || this.address.fullName == undefined || this.address.fullName == null){
      alert("Please Enter Full Name");
    }else if(this.address.mobileNo == '' || this.address.mobileNo == undefined || this.address.mobileNo == null){
      alert("Please Enter Mobile Number");
    }else if(this.address.Pincode == '' || this.address.Pincode == undefined || this.address.Pincode == null){
      alert("Please Enter Pincode");
    }else if(this.address.flatOrHouseNo == '' || this.address.flatOrHouseNo == undefined || this.address.flatOrHouseNo == null){
      alert("Please Enter Flat/House No. or building Number,");
    }else if(this.address.streetOrLocality == '' || this.address.streetOrLocality == undefined || this.address.streetOrLocality == null){
      alert("Please enter Order Adress Nearest Locality");
    }else if(this.address.landmark == '' || this.address.landmark == undefined || this.address.landmark == null){
      alert("Adress Landmark is Mandatory");
    }
    // else if(! /^\d{10}$/.test(this.address.altMobileNo)){
    //   alert("Invalid Phone number, must be 10 digits")
    // }
    else if(! /^\d{6}$/.test(this.address.Pincode)){
      alert("Invalid Pin number, must be 6 digits")
    }else{
      if(this.address.altMobileNo) {
        if(! /^\d{10}$/.test(this.address.altMobileNo)){
          alert("Invalid Phone number, must be 10 digits")
        }
        else {
          this.address.altMobileNo = `+91${this.address.altMobileNo}`;
          firebase.database().ref('users/' + this.globalService.firebaseUid + '/saveAddress/').push(this.address).then(()=>{
            this.viewCtrl.dismiss()
            alert('Address added Successfully');
            let allData = {
              orders: this.orderData,
              orderAddres:this.address,
              orderPrice:this.price
            }
            let slotModal = this.modalCtrl.create('SlotBookingPage',  { orderData:allData });
                slotModal.present();
          })
        }
      }
      else {
        firebase.database().ref('users/' + this.globalService.firebaseUid + '/saveAddress/').push(this.address).then(()=>{
          this.viewCtrl.dismiss()
          alert('Address added Successfully');
          let allData = {
            orders: this.orderData,
            orderAddres:this.address,
            orderPrice:this.price
          }
          let slotModal = this.modalCtrl.create('SlotBookingPage',  { orderData:allData });
              slotModal.present();
        })
      }

    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewAddressPage');
  }

}
