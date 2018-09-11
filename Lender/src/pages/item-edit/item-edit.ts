import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item, GlobalVarible } from '../../app/models';

/**
 * Generated class for the ItemEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-edit',
  templateUrl: 'item-edit.html',
})
export class ItemEditPage {

  item: Item = new Item;
  newAmount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditPage');
  }

  ionViewDidEnter() {
    this.http.get<Item>(GlobalVarible.host + "/api/Lender/GetItem/" + this.navParams.data._id)
      .subscribe(data => {
        this.item = data;
        console.log(this.item)
      });
    this.newAmount = this.item.amount;
  }

  EditItem() {
    this.item.amount = this.newAmount;
    this.item.totalAmount += (this.newAmount - this.item.amount);
    this.http.post(GlobalVarible.host + "/api/Lender/EditItem", this.item)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

}
