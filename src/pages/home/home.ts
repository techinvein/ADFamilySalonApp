
import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  maleClass:boolean = true;
  femaleClass:boolean = false;
  alldata:any;
  showDetails:any;
  cartTotal:any;
  geoAddress:any;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  banners:any = [];
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,private nativeGeocoder: NativeGeocoder,private geolocation: Geolocation) {
    this.alldata = {
      male: [],
      female: []
    }
    
    firebase.database().ref('banners/').on('value',(snapBanner)=>{
      if(snapBanner.val()){
        this.banners = snapBanner.val();
      }
    })
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    }); 
    loading.present();
    console.log('ionViewDidLoad HomePage');
    firebase.database().ref('products/').on('value',(snap)=>{
      console.log(snap.val());
      let allProducts = snap.val();
      for(let i=0; i<allProducts.length; i++) {
        if(allProducts[i].name == 'Male') {
          let malePrdcts = []
          for(let key in allProducts[0].categories) {
            allProducts[0].categories[key].uid = key;
            malePrdcts.push(allProducts[0].categories[key]);
          }
          this.alldata.male = malePrdcts;
        }
        else {
          let femalePrdcts = []
          for(let key in allProducts[1].categories) {
            allProducts[1].categories[key].uid = key;
            femalePrdcts.push(allProducts[1].categories[key]);
          }
          this.alldata.female = femalePrdcts;
        }
      }
      this.showDetails = this.alldata.male;
      this.checkCartItem()
      console.log(this.alldata)
      //this.getLocation()
      loading.dismiss();
    })
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('geolocation start')
      this.getGeoencoder(resp.coords.latitude,resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  clickGender(value){
    console.log(value)
      if(value == 'male'){
        this.maleClass =true;
        this.femaleClass =false;
        this.showDetails = this.alldata.male;
      }else{
        this.maleClass =false;
        this.femaleClass =true;
        this.showDetails = this.alldata.female;
      }
  }

  goToItemDetails(item, index){
    item.serviceFor=this.maleClass?'Male':'Female';
    this.navCtrl.push("ProductListPage", { catDetails: item });
  }

  checkout(){
    this.navCtrl.push("CartPage");
  }
  

  checkCartItem(){
    let currentUser = firebase.auth().currentUser.uid;
    if(currentUser) {
      firebase.database().ref('users/' + currentUser + '/cart/').on('value',(snap)=>{
        console.log(snap.val());
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

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude,longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderReverseResult[]) => {
      this.geoAddress = this.generateAddress(result[0]);
      if(this.geoAddress){
        let location = {
          lat:latitude,
          lng:longitude,
          add:this.geoAddress
        }
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/location/').set(location)
      }

    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  //Return Comma saperated address
  generateAddress(addressObj){
      let obj = [];
      let address = "";
      for (let key in addressObj) {
        obj.push(addressObj[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        address += obj[val]+', ';
      }
    return address.slice(0, -2);
  }
}
