import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LockerListPage } from '../locker-list/locker-list';
import { GlobalVarible, Item } from '../../app/models';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { KeyListPage } from '../key-list/key-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  barcodeData: string;
  items: Item[] = [];
  status: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public http: HttpClient) {

  }

  Borrow(LockerID: string) {
    this.navCtrl.push(LockerListPage, { _locker: LockerID });
  }

  ionViewDidEnter() {
    this.http.get<Item[]>(GlobalVarible.host + "/api/Lender/ListItemsLender/" + GlobalVarible.lender.id)
      .subscribe(data => {
        this.items = data;
        if (this.items.length == 0) {
          this.status = false;
        }
        else {
          this.status = true;
        }
        console.log(this.items)
      });
  }

  // Borrow() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //     if (barcodeData.text != undefined) {
  //       this.navCtrl.push(LockerListPage, { _locker: barcodeData.text });
  //     }
  //   }).catch(err => {
  //     console.log('Error', err);
  //   });
  // }

  KeyList() {
    this.navCtrl.push(KeyListPage);
  }


}
