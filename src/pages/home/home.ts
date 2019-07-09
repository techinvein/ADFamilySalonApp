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
        {name:'Hair Treatement',image:"https://www.adfamilysalon-academy.com/images/hair-treatment.jpg"},{name:'Hair Style',image:"https://www.adfamilysalon-academy.com/images/g2.jpg"},{name:'COLOUR',image:'https://www.adfamilysalon-academy.com/images/colour.jpg'},{name:'FACIAL',image:'https://www.adfamilysalon-academy.com/images/facial.jpg'},{name:'Polishing',image:'http://cdn2.dealnyou.in/img/original/27.JPG?w=433&h=416'},{name:'Manicure',image:'./assets/imgs/pedicure2.jpg'}
      ],
      female:[ {name:'Hair Treatement',image:"./assets/imgs/Services_Hair1.png"},{name:'Makeup',image:'./assets/imgs/maxresdefault.jpg'},{name:'Hair Style',image:"./assets/imgs/hair-style-layered_440948.png"},{name:'THREADING',image:"https://www.adfamilysalon-academy.com/images/threading.jpg"},{name:'FACIAL',image:'./assets/imgs/facial.jpg'},{name:'BLEACH',image:'./assets/imgs/3clean-up7.jpg'},{name:'PEDICURE',image:'https://www.adfamilysalon-academy.com/images/pedicure.jpg'},{name:'MANICURE',image:'https://www.adfamilysalon-academy.com/images/manicure.jpg'}]
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
    this.navCtrl.push("ProductListPage");
  }

  checkout(){
    this.navCtrl.push("CartPage");
  }
  

}
