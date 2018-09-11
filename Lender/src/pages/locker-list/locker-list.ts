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
  borrow: Borrow = new Borrow;
  status: boolean;

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
            if (this.items.length == 0) {
              this.status = false;
            }
            else {
              this.status = true;
            }
          });
      });
  }

  Cancel() {
    this.navCtrl.pop();
  }

  Borrow() {
    this.borrow.lockerId = this.locker.id;
    this.borrow.lockerName = this.locker.name;
    this.borrow.lockerCate = this.locker.cate;
    this.borrow.lenderId = GlobalVarible.lender.id;
    this.borrow.lenderName = GlobalVarible.lender.name;
    this.borrow.items = this.items;
    
    this.http.post(GlobalVarible.host + "/api/Lender/CreateBorrow", this.borrow)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }



}
