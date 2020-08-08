import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  firstName: any = "";
  lastName: any = "";
  email: any = "";
  mobileNumber: any = "";
  prifileImage: any = "";
  isFNameEnabled: boolean;
  isLNameEnabled: boolean;
  isEmailEnabled: boolean;
  cartTotal: any = 0;
  bgColor: any = "#000";
  fgColor: any = "#fff";
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(this.globalService.firebaseUid);
    
    let currentUser = this.globalService.firebaseUid;
    if(currentUser) {
      firebase.database().ref('users/' + currentUser + '/').on('value',(snap)=>{
        console.log('userDetails',snap.val());
        if(snap.val()) {
          let userDetails = snap.val();
          this.bgColor = this.getBackGroundColor(userDetails.name, 30, 80);
          this.fgColor = this.getNameColor(userDetails.name, 90, 20);
          console.log(this.bgColor, this.fgColor);
          
          this.prifileImage = userDetails.firstName.charAt(0)+ " " +userDetails.lastName.charAt(0);
          this.firstName = userDetails.firstName;
          this.lastName = userDetails.lastName;
          this.mobileNumber = userDetails.mobile_number;
          if(userDetails.email) {
            this.email = userDetails.email;
          }
          if(userDetails.cart) {
            let data = userDetails.cart;
            this.cartTotal = Object.keys(data).length;
            }
          else {
            this.cartTotal = 0;
          }
        }
        else {
        }
      })
    }
  }

  getBackGroundColor(str, s, l) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    var h = hash % 360;
    return 'hsl('+h+', '+s+'%, '+l+'%)';
  }

  getNameColor(str, s, l) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    var h = hash % 360;
    return 'hsl('+h+', '+s+'%, '+l+'%)';
  }

  /*  ion-item pencil icon function. 
      Please change individual function name for every pencil icon 
  */
  clickFirstName(){
    this.isFNameEnabled = !this.isFNameEnabled;
  }

  clickLastName(){
    this.isLNameEnabled = !this.isLNameEnabled;
  }

  clickEmail(){
    this.isEmailEnabled = !this.isEmailEnabled;
  }

  uploadCam(){
    alert("Functionality no implemented yet.")
  }

  updateProfile(){
    if(this.firstName === "" || this.firstName === null || this.firstName === undefined || this.firstName.trim() == '') {
      alert('Please Provide First Name')
    }
    else if(this.lastName === "" || this.lastName === null || this.lastName === undefined || this.lastName.trim() == '') {
      alert('Please Provide Last Name')
    }
    else {
      firebase.database().ref('users/' + this.globalService.firebaseUid + '/').update({
        email: this.email,
        name: this.firstName+ " " +this.lastName,
        firstName: this.firstName,
        lastName: this.lastName,
      })
      .then(()=>{
        this.isFNameEnabled = false;
        this.isLNameEnabled = false;
        this.isEmailEnabled = false;
      })
    }
  }

}
