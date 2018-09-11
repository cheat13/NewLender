import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LockerListPage } from '../locker-list/locker-list';
import { GlobalVarible, Item, Borrow } from '../../app/models';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { KeyListPage } from '../key-list/key-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  barcodeData: string;
  borrows: Borrow[] = [];
  status: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public http: HttpClient) {

  }

  ionViewDidEnter() {
    this.http.get<Borrow[]>(GlobalVarible.host + "/api/Lender/GetBorrowLender/" + GlobalVarible.lender.id)
      .subscribe(data => {
        this.borrows = data;
        console.log(this.borrows);
        if (this.borrows.length == 0) {
          this.status = false;
        }
        else {
          this.status = true;
        }
      });
  }

  Borrow(LockerID: string) {
    this.navCtrl.push(LockerListPage, { _locker: LockerID });
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

  BorrowItemDetail(LockerID: string){

  }


}
