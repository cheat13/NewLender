import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item, GlobalVarible } from '../../app/models';
import { ItemDetailPage } from '../item-detail/item-detail';

@IonicPage()
@Component({
  selector: 'page-search-items',
  templateUrl: 'search-items.html',
})
export class SearchItemsPage {

  items;
  Items: Item[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchItemsPage');
  }

  ionViewDidEnter() {
    this.http.get<Item[]>(GlobalVarible.host + "/api/Lender/GetAllItem")
      .subscribe(data => {
        this.Items = data;
        this.initializeItems()
      });

  }

  initializeItems() {
    this.items = this.Items;
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems()
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ItemDetail(id: string) {
    this.navCtrl.push(ItemDetailPage, { _id: id });
  }
}
