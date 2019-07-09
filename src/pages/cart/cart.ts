import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  payMethod:any = "Cash after Service";
  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
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
        {
          text: 'Online Payment',
          handler: () => {
            this.payMethod = 'Online Payment'
            console.log('Archive clicked');
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
    let profileModal = this.modalCtrl.create('SlotBookingPage', { userId: 8675309 });
    profileModal.present();
    
  }

}
