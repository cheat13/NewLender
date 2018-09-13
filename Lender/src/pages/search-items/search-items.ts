import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item, GlobalVarible } from '../../app/models';

@IonicPage()
@Component({
  selector: 'page-search-items',
  templateUrl: 'search-items.html',
})
export class SearchItemsPage {

  items;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.initializeItems()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchItemsPage');
  }

  initializeItems() {
    this.http.get<Item[]>(GlobalVarible.host + "/api/Lender/GetAllItem")
      .subscribe(data => {
        this.items = data;
      });
  }



  getItems(ev) {
    // Reset items back to all of the items

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.initializeItems()
    }
  }
}
