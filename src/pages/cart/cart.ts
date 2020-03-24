import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  payMethod:any = "Cash after Service";
  allCartProducts:any = [];;
  cartTotal: any;
  currentUser: any

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public navParams: NavParams,public modalCtrl: ModalController) {
    console.log('ionViewDidLoad CartPage');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.currentUser = firebase.auth().currentUser.uid;
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
          text: 'Cash after Service',
          role: 'destructive',
          handler: () => {
            this.payMethod = 'Cash after Service'
            console.log('Destructive clicked');
          }
        },
        // {
        //   text: 'Online Payment',
        //   handler: () => {
        //     this.payMethod = 'Online Payment'
        //     console.log('Archive clicked');
        //   }
        // },
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
    this.navCtrl.push('AdressModalPage',{orderData:this.allCartProducts,orderPrice:this.cartTotal})
  }

}
