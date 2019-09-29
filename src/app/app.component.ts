import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'firebase';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "HomePage";
  // rootPage:any = "PhoneNumberAddPage";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage" },
      { title: 'Profile', component: "ProfilePage" },
      { title: 'My Orders', component: "HistoryPage" },
      { title: 'My Cart', component: "CartPage" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 5000);
      
      this.authenticateUser()
    });
  }

  authenticateUser() {
    // console.log('hii')
    // firebase.auth().createUserWithEmailAndPassword('sarghyadeep@gmail.com','Vein9*').then((user)=>{
    //   console.log(user);
    //   firebase.database().ref('users/'+user.user.uid).set({
    //     email: 'sarghyadeep@gmail.com',
    //     name: "Arghyadeep Sinha",
    //     address: "Madhyamgram"
    //   })
    // })

    // firebase.auth().signInWithEmailAndPassword("sarghyadeep@gmail.com","Vein9*")
    
    firebase.auth().onAuthStateChanged((user)=>{
      if(user) {
        console.log(user);
        this.rootPage = "HomePage"
      }
      else {
        this.rootPage = "PhoneNumberAddPage"
        console.log('no user')
      }
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    firebase.auth().signOut();
    // this.nav.setRoot('PhoneNumberAddPage');
  }
}
