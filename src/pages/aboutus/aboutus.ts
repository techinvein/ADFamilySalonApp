import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  adminData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    firebase.database().ref('adminInfo/').on('value',(snap)=>{
      if(snap.val()){
        this.adminData = snap.val();
        console.log(this.adminData)
        loading.dismiss();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }

}
