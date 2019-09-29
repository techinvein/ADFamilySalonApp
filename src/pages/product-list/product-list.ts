import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
      this.allItems.push(subCatDetails[key]);
    }
  }

  cartPage(){
    this.navCtrl.push("CartPage");
  }

  addToCart(item, index){
    alert('Successfully Added')
  }
  
}
