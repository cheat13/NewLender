import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Locker, Item, GlobalVarible } from '../../app/models';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-item-add',
  templateUrl: 'item-add.html',
})
export class ItemAddPage {

  locker: Locker = new Locker;
  item: Item = new Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemAddPage');
  }

  AddItem() {
    this.http.post(GlobalVarible.host + "/api/Lender/CreateItem", this.item)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

  ionViewDidEnter() {
    this.locker = this.navParams.data._locker;
    this.item.locker = this.locker.id;
    this.item.lockerName = this.locker.name
  }

}
