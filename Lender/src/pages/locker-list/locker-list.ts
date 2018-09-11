import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item, GlobalVarible, Locker, Lender, Borrow } from '../../app/models';

@IonicPage()
@Component({
  selector: 'page-locker-list',
  templateUrl: 'locker-list.html',
})
export class LockerListPage {

  items: Item[] = [];
  locker: Locker = new Locker;
  lenders: Lender[] = [];
  borrows: Borrow[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockerListPage');
  }

  ionViewDidEnter() {


    this.http.get<Locker>(GlobalVarible.host + "/api/Lender/GetLocker/" + this.navParams.data._locker)
      .subscribe(data => {
        this.locker = data;
        this.http.get<Item[]>(GlobalVarible.host + "/api/Lender/ListItems/" + this.navParams.data._locker)
          .subscribe(data => {
            this.items = data;
            console.log(this.items);
            
            for (let i = 0; i < this.items.length; i++) {
              this.lenders[i] = GlobalVarible.lender;
              this.borrows[i].name = this.items[i].name;
              this.borrows[i].amount = this.items[i].amount;
              this.borrows[i].borrow = this.lenders[i].borrow;
            }
            console.log(this.borrows);


          });
      });


  }


  Cancel() {
    this.navCtrl.pop();
  }



}
