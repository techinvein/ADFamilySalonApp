import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import * as firebase from 'firebase';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  payMethod:any = "";
  allCartProducts:any = [];;
  cartTotal: any;
  currentUser: any

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public navParams: NavParams,public modalCtrl: ModalController, public globalService: GlobalServiceProvider, private iab: InAppBrowser, private http: Http) {
    console.log('ionViewDidLoad CartPage');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.currentUser = this.globalService.firebaseUid;
    if(this.currentUser) {
      firebase.database().ref('users/' + this.currentUser + '/cart/').on('value',(snap)=>{
        if(snap.val()) {
          let allProducts = snap.val();
          let cartProducts = []
          for(let key in allProducts) {
            allProducts[key].uid = key;
            cartProducts.push(allProducts[key]);
          }
          this.allCartProducts = cartProducts;
          console.log(this.allCartProducts)
          this.cartTotalCalc()
        }
        else {
          console.log(this.allCartProducts);
          this.allCartProducts = []
        }
      })
    }
  }
  cartTotalCalc() {
    let cartTotal = 0;
    for(let i=0; i< this.allCartProducts.length; i++) {
      cartTotal = cartTotal + this.allCartProducts[i].subcat_price;
    }
    this.cartTotal = cartTotal;
  }
  increment(item) {
    let price = item.original_price * (item.qty + 1)
    firebase.database().ref('users/' + this.currentUser + '/cart/' + item.uid + '/').update({
      qty: (item.qty + 1),
      subcat_price: price
    })
  }

  decrement(item) {
    let price = item.original_price * (item.qty - 1)
    firebase.database().ref('users/' + this.currentUser + '/cart/' + item.uid + '/').update({
      qty: (item.qty - 1),
      subcat_price: price
    })
  }

  deleteItem(item) {
    firebase.database().ref('users/' + this.currentUser + '/cart/' + item.uid + '/').remove();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Payment Method',
      buttons: [
        {
          text: 'Select',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Cash after Service',
          role: 'destructive',
          handler: () => {
            this.payMethod = 'Cash after Service'
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Online Payment',
          handler: () => {
            this.payMethod = 'Online Payment'
            // this.payWithRazorpay()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
  continue(){
    if(this.payMethod) {
      this.navCtrl.push('AdressModalPage',{orderData:this.allCartProducts,orderPrice:this.cartTotal, paymentMethod: this.payMethod})
    }
    else {
      alert("Please select your payment method to continue")
    }
  }

/////////////////////////////////////////////////
payWithRazorpay() {
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_RRmcFbiJMHpzWZ',
    amount: '5000',
    name: 'foo',
    prefill: {
      email: 'pranav@razorpay.com',
      contact: '8879524924',
      name: 'Pranav Gupta'
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
    alert('payment_id: ' + payment_id);
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
