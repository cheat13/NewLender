import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LockerListPage } from '../locker-list/locker-list';
import { GlobalVarible, Item, Borrow, Locker, Lender } from '../../app/models';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { KeyListPage } from '../key-list/key-list';
import { ConfirmBorrowPage } from '../confirm-borrow/confirm-borrow';
import { RequestBorrowPage } from '../request-borrow/request-borrow';
import { BorrowDetailPage } from '../borrow-detail/borrow-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  barcodeData: string;
  borrows: Borrow[] = [];
  status: boolean;
  budder: boolean = false;
  locker: Locker = new Locker;
  lender: Lender = new Lender;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public http: HttpClient) {

  }

  ionViewDidEnter() {
    this.lender = GlobalVarible.lender;
    this.http.get<Borrow[]>(GlobalVarible.host + "/api/Lender/GetBorrowLender/" + GlobalVarible.lender.id)
      .subscribe(data => {
        this.borrows = data;
        console.log(this.borrows);
        if (this.borrows.length == 0) {
          this.status = false;
        }
        else {
          for (let i = 0; i < this.borrows.length; i++) {
            if (this.borrows[i].lenderId == GlobalVarible.lender.id) {
              this.status = true;
              break;
            }
          }
          for (let i = 0; i < this.borrows.length; i++) {
            if (this.borrows[i].buddyId == GlobalVarible.lender.id) {
              this.budder = true;
              break;
            }
          }
        }
      });
  }

  // Borrow(LockerID: string) {
  //   this.navCtrl.push(LockerListPage, { _lockerId: LockerID });
  // }

  Borrow() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.text != undefined) {

        this.http.get<Locker>(GlobalVarible.host + "/api/Lender/GetLocker/" + barcodeData.text)
          .subscribe(data => {
            this.locker = data;
            if (this.locker != null) {
              this.navCtrl.push(LockerListPage, { _lockerId: barcodeData.text });
            }
            else {
              this.navCtrl.push(ConfirmBorrowPage, { _borrowId: barcodeData.text });
            }
          });
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  KeyList() {
    this.navCtrl.push(KeyListPage);
  }

  SendRequest(id: string) {

    this.http.get<Borrow>(GlobalVarible.host + "/api/Lender/GetBorrow/" + id)
      .subscribe(data => {
        var borrow = data;
        this.navCtrl.push(RequestBorrowPage, { _borrow: borrow })
      });
  }

  BorrowDetail(borrow: Borrow) {
    this.navCtrl.push(BorrowDetailPage, { _borrow: borrow });
  }
}
