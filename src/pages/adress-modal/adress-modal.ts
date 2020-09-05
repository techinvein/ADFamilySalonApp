import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import * as firebase from 'firebase';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
@IonicPage()
@Component({
  selector: 'page-adress-modal',
  templateUrl: 'adress-modal.html',
})
export class AdressModalPage {
  orderData:any;
  saveaddress:any = [];
  price:any;
  paymentMethod: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, public globalService: GlobalServiceProvider) {
    let orderDetails = this.navParams.get('orderData');
    let orderPrice = this.navParams.get('orderPrice');
    this.paymentMethod = this.navParams.get('paymentMethod');
    if(orderDetails && orderPrice) {
      this.orderData = orderDetails;
      this.price = orderPrice
     
    }
  }

  ionViewDidLoad() {
    this.loadAddressData()
    console.log('ionViewDidLoad AdressModalPage');

  }

  addAddress(){
    let profileModal = this.modalCtrl.create('AddNewAddressPage', { orderData: this.orderData,orderPrice:this.price});
    profileModal.present();
  }
  loadAddressData(){
    console.log('address')
    let currentUser = this.globalService.firebaseUid;
    if(currentUser) {
      firebase.database().ref('users/' + currentUser + '/saveAddress').once('value',(snap)=>{
        console.log(snap.val());
        if(snap.val()) {
          let addressDataobj = snap.val();
          this.saveaddress = [];
          for(let key in addressDataobj){
            this.saveaddress.push(addressDataobj[key])
          }
          this.saveaddress.reverse();
          console.log(this.saveaddress)
        }
      })
    }
  }

  continue(address){
    let allData = {
      orders: this.orderData,
      orderAddres:address,
      orderPrice:this.price
    }
    let slotModal = this.modalCtrl.create('SlotBookingPage',  { orderData: allData, paymentMethod: this.paymentMethod });
    slotModal.present();
  }

}