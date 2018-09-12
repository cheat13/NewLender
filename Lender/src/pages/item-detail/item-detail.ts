import { Item, GlobalVarible, Borrow, Locker } from './../../app/models';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-item-detail',
    templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

    item: Item = new Item;
    borrows: Borrow[] = [];

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
        this.http.get<Borrow[]>(GlobalVarible.host + "/api/Lender/GetAllBorrow")
            .subscribe(data => {
                this.borrows = data;
                console.log(this.borrows)
            });
    }


}
