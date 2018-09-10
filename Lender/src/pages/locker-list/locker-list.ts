import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item, GlobalVarible, Locker, Lender } from '../../app/models';

@IonicPage()
@Component({
  selector: 'page-locker-list',
  templateUrl: 'locker-list.html',
})
export class LockerListPage {

  items: Item[];
  locker: Locker = new Locker;
  lender: Lender = new Lender;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockerListPage');
  }

  ionViewDidEnter() {
    console.log(GlobalVarible.lender)
    this.lender = GlobalVarible.lender

    this.http.get<Locker>(GlobalVarible.host + "/api/Lender/GetLocker/" + this.navParams.data._locker)
      .subscribe(data => {
        this.locker = data;
      });

    this.http.get<Item[]>(GlobalVarible.host + "/api/Lender/ListItems/" + this.navParams.data._locker)
      .subscribe(data => {
        this.items = data;
        console.log(this.items)
        this.lender.items = this.items;
        console.log(this.lender)
      });
  }

  Cancel() {
    this.navCtrl.pop();
  }

  Borrow() {
    this.http.post(GlobalVarible.host + "/api/Lender/Borrow", this.lender)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }




}
