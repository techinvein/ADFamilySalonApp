import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  allItems=[];
  allCatDetails: any;
  catName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
    let allCatDetails = this.navParams.get('catDetails');
    if(allCatDetails) {
      this.allCatDetails = allCatDetails;
      this.catName = allCatDetails.cat_name;
      this.subCatDetails()
    }
  }

  subCatDetails() {
    let subCatDetails = this.allCatDetails.subcategories;
    for(let key in subCatDetails) {
      subCatDetails[key].puid = key;
      subCatDetails[key].image = this.allCatDetails.cat_image;
      subCatDetails[key].qty = 1;
      subCatDetails[key].original_price = subCatDetails[key].subcat_price;
      this.allItems.push(subCatDetails[key]);
    }
  }

  cartPage(){
    this.navCtrl.push("CartPage");
  }

  addToCart(item, index){
    firebase.database().ref('users/' +firebase.auth().currentUser.uid+'/cart/').push(item)
    alert('Successfully Added')
  }
  
}
