import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LockerListPage } from '../locker-list/locker-list';
import { GlobalVarible } from '../../app/models';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { KeyListPage } from '../key-list/key-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  barcodeData: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {

  }

  // LockerList(LockerID: string) {
  //   this.navCtrl.push(LockerListPage, { _locker: LockerID });
  // }

  ionViewDidEnter() {
    console.log(GlobalVarible.lender)
  }

  Borrow() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (barcodeData.text != undefined) {
        this.navCtrl.push(LockerListPage, { _locker: barcodeData.text });
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  KeyList(){
    this.navCtrl.push(KeyListPage);
  }

}
