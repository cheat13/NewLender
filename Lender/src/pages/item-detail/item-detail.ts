import { Item, GlobalVarible } from './../../app/models';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemEditPage } from '../item-edit/item-edit';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

  item: Item = new Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailPage');
  }

  ionViewDidEnter() {
    this.http.get<Item>(GlobalVarible.host + "/api/Lender/GetItem/" + this.navParams.data._id)
      .subscribe(data => {
        this.item = data;
        console.log(this.item)
      });
  }


}
