import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item, GlobalVarible, Locker, Borrow } from '../../app/models';
import { RequestBorrowPage } from '../request-borrow/request-borrow';

@IonicPage()
@Component({
  selector: 'page-locker-list',
  templateUrl: 'locker-list.html',
})
export class LockerListPage {

  items: Item[] = [];
  locker: Locker = new Locker;
  borrow: Borrow = new Borrow;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockerListPage');
  }

  ionViewDidEnter() {
    this.borrow.lenderId = GlobalVarible.lender.id;
    this.borrow.lenderName = GlobalVarible.lender.name;
    this.http.get<Locker>(GlobalVarible.host + "/api/Lender/GetLocker/" + this.navParams.data._lockerId)
      .subscribe(data => {
        this.locker = data;
        this.borrow.lockerId = this.locker.id;
        this.borrow.lockerName = this.locker.name;
        this.borrow.lockerCate = this.locker.cate;
        this.http.get<Item[]>(GlobalVarible.host + "/api/Lender/ListItems/" + this.navParams.data._lockerId)
          .subscribe(data => {
            this.items = data;
            console.log(this.items);
          });
      });
  }

  Cancel() {
    this.navCtrl.pop();
  }

  // Borrow() {
  //   this.borrow.items = this.items;
  //   this.http.post(GlobalVarible.host + "/api/Lender/CreateBorrow", this.borrow)
  //     .subscribe(data => {
  //       this.navCtrl.pop();
  //     });
  // }

  Borrow() {
    this.borrow.items = this.items;
    this.http.post<Borrow>(GlobalVarible.host + "/api/Lender/CreateBorrow", this.borrow)
      .subscribe(data => {
        this.borrow = data;
        console.log(this.borrow)
        this.navCtrl.push(RequestBorrowPage, { _borrow: this.borrow })
      });
  }



}
