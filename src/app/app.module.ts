import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { CallNumber } from '@ionic-native/call-number';

var firebaseConfig = {
  apiKey: "AIzaSyAn9HZ9eS9M1gHgHNg4LsgJtbto5oSAPfo",
  authDomain: "salon-ef6a7.firebaseapp.com",
  databaseURL: "https://salon-ef6a7.firebaseio.com",
  projectId: "salon-ef6a7",
  storageBucket: "salon-ef6a7.appspot.com",
  messagingSenderId: "1022574101777",
  appId: "1:1022574101777:web:6e382890782f6397"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
