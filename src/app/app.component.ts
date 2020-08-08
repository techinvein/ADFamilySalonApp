import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'firebase';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { GlobalServiceProvider } from '../providers/global-service/global-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  // rootPage: any;
  rootPage:any;
  firstName: any = "";
  lastName: any = "";
  fullName: any = "";
  mobileNumber: any = "";
  prifileImage: any = "";
  bgColor: any = "#000";
  fgColor: any = "#fff";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private firebaseAuthentication: FirebaseAuthentication, public globalService: GlobalServiceProvider, public zone: NgZone) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage" },
      { title: 'Profile', component: "ProfilePage" },
      { title: 'My Orders', component: "HistoryPage" },
      { title: 'My Cart', component: "CartPage" },
      { title: 'About Us', component: "AboutusPage" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      localStorage.removeItem('firebase:previous_websocket_failure');
      this.authenticateUser()

      this.statusBar.styleLightContent();
      // setTimeout(() => {
      //   this.splashScreen.hide();
      // }, 5000);
      
    });
  }

  authenticateUser() {
  
   //firebase.auth().signInWithEmailAndPassword("sarghyadeep@gmail.com","Vein9*")
    // firebase.auth().signInWithEmailAndPassword("s@g.com","123456")
    this.firebaseAuthentication.onAuthStateChanged().subscribe((user)=>{
      if(user) {
        console.log("user",user);
        this.globalService.firebaseUid = user.uid;
        this.globalService.phoneNumber = user.phoneNumber;

        this.zone.run(()=>{
          this.rootPage = "HomePage";
          this.splashScreen.hide();
        })
        this.fetchUserDetails(user.uid);
      }
      else {
        this.zone.run(()=>{
          this.rootPage = "PhoneNumberAddPage";
          this.splashScreen.hide();

        });
        console.log('no user')
      }
    });

    // firebase.auth().onAuthStateChanged((user)=>{
    //   if(user) {
    //     console.log(user);
    //     this.rootPage = "HomePage"
    //   }
    //   else {
    //     this.rootPage = "PhoneNumberAddPage"
    //     console.log('no user')
    //   }
    // })
  }

  fetchUserDetails(uid) {
    let currentUser = uid;
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
          this.fullName = userDetails.name;
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    // firebase.auth().signOut();
    this.firebaseAuthentication.signOut();
    this.globalService.firebaseUid = "";
    // this.nav.setRoot('PhoneNumberAddPage');
  }
}
