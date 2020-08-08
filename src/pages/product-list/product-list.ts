import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  allItems=[];
  allCatDetails: any;
  catName: any;
  cartTotal:any;
  image:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalServiceProvider) {
    this.image = "https://www.menshairstylestoday.com/wp-content/uploads/2019/02/Short-Fade-Haircut.jpg"
  }

  ionViewDidLoad() {
    let allCatDetails = this.navParams.get('catDetails');
    if(allCatDetails) {
      console.log(allCatDetails)
      this.allCatDetails = allCatDetails;
      this.catName = allCatDetails.cat_name;
      this.subCatDetails()
      this.image = this.allCatDetails.cat_cover_image
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
      this.checkCartItem()
    }
  }

  cartPage(){
    this.navCtrl.push("CartPage");
  }

  addToCart(item, index){
    firebase.database().ref('users/' +this.globalService.firebaseUid+ '/cart/').once('value',(snap)=>{
      if(snap.val()){
        let allCarts = snap.val();
        var flag = true;
        for(let key in allCarts){
          if(allCarts[key].subcat_code == item.subcat_code){
            flag = true;
            break;
          }else{
            flag = false;
          }
        }
        if(flag == false){
          item.serviceFor =  this.allCatDetails.serviceFor
          firebase.database().ref('users/' +this.globalService.firebaseUid+'/cart/').push(item)
          alert('Successfully Added')
        }else{
          alert('Already Added')
        }
      }else{
        item.serviceFor =  this.allCatDetails.serviceFor
        firebase.database().ref('users/' +this.globalService.firebaseUid+'/cart/').push(item)
        alert('Successfully Added')
      }
    })
}
  
  checkCartItem(){
    let currentUser = this.globalService.firebaseUid;
    if(currentUser) {
      firebase.database().ref('users/' + currentUser + '/cart/').on('value',(snap)=>{
        let cartProducts = []
        if(snap.val()) {
          let data = snap.val();
          this.cartTotal = Object.keys(data).length;
          }
        else {
          this.cartTotal = 0;
        }
      })
    }
  }
}
