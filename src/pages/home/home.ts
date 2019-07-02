import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.alldata={
      male:[
        {name:'HAIR'},{name:'SKIN'},{name:'COLOUR'},{name:'FACIAL'},
      ],
      female:[{name:'HAIR'},{name:'THREADING'},{name:'FACIAL'},{name:'BLEACH'},{name:'PEDICURE'},{name:'MANICURE'}]
    }
    this.showDetails = this.alldata.male;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
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

  goToItemDetails(){
    this.navCtrl.push("ItemDetailsPage");
  }

  

}
