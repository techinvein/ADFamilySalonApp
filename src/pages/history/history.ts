import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public ordersegment:any = "current";
  public showableData:any;

  allItems={
    current:[
      {name: 'Hair Styling', status:"Pending", img: "../../assets/imgs/g2.jpg"},
      {name: 'Make Up', status:"Approved", img: "../../assets/imgs/makeup.jpg"},
      {name: 'Manicure', status:"Pending", img: "../../assets/imgs/manicure.jpg"},
      {name: 'Trimming', status:"Approved", img: "../../assets/imgs/trimming.jpg"},
      {name: 'Pedicure', status:"Pending", img: "https://www.adfamilysalon-academy.com/images/pedicure.jpg"}
    ],
    complete:[
      {name: 'Pedicure', status:"Cancel", img: "https://www.adfamilysalon-academy.com/images/pedicure.jpg"},
      {name: 'Threading', status:"Complete", img: "https://www.adfamilysalon-academy.com/images/threading.jpg"},
      {name: 'Hair Treatment', status:"Cancel", img: "https://www.adfamilysalon-academy.com/images/hair-treatment.jpg"},
      {name: 'Trimming', status:"Cancel", img: "../../assets/imgs/trimming.jpg"},
      {name: 'Manicure', status:"Complete", img: "https://www.adfamilysalon-academy.com/images/manicure.jpg"},
      {name: 'Manicure', status:"Cancel", img: "../../assets/imgs/manicure.jpg"},
      {name: 'Hair Styling', status:"Complete", img: "../../assets/imgs/g2.jpg"},
      {name: 'Make Up', status:"Complete", img: "../../assets/imgs/makeup.jpg"}
    ]
    
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.showableData = this.allItems.current;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
  segmentChange(value){
    let vv = value;
    this.showableData = this.allItems[vv]
  }
  

  trackOrder(){
    this.navCtrl.push("TrackOrderPage")
  }

  checkout(){
    this.navCtrl.push("CartPage");
  }
}
