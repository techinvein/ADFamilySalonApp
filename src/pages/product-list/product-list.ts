import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  allItems=[1,1,1,1,1,1,1,1,1]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }
  cartPage(){
    this.navCtrl.push("CartPage");
  }
  addToCart(){
    alert('Successfully Added')
  }
  
}
