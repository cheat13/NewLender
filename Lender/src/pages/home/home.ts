import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LockerListPage } from '../locker-list/locker-list';
import { GlobalVarible, Item, BorrowList, Locker, Lender, ReturnList } from '../../app/models';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { KeyListPage } from '../key-list/key-list';
import { ConfirmBorrowPage } from '../confirm-borrow/confirm-borrow';
import { RequestBorrowPage } from '../request-borrow/request-borrow';
import { BorrowDetailPage } from '../borrow-detail/borrow-detail';
import { ConfirmReturnPage } from '../confirm-return/confirm-return';
import { RequestReturnPage } from '../request-return/request-return';
import { SearchItemsPage } from '../search-items/search-items';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  barcodeData: string;
  borrows: BorrowList[] = [];
  status: boolean;
  statusReturn: boolean;
  budder: boolean = false;
  locker: Locker = new Locker;
  lender: Lender = new Lender;
  borrowList: BorrowList = new BorrowList;
  returnList: ReturnList[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, public http: HttpClient) {

  }

  ionViewDidEnter() {
    this.status = null;
    this.lender = GlobalVarible.lender;
    this.http.get<BorrowList[]>(GlobalVarible.host + "/api/Lender/GetBorrowLender/" + GlobalVarible.lender.id)
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
        this.http.get<ReturnList[]>(GlobalVarible.host + "/api/Lender/GetReturnListReturner/" + GlobalVarible.lender.id)
          .subscribe(data => {
            this.returnList = data;
            if (this.returnList.length == 0) {
              this.statusReturn = false;
            }
            else {
              this.statusReturn = true;
            }
          });
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
              this.http.get<BorrowList>(GlobalVarible.host + "/api/Lender/GetBorrow/" + barcodeData.text)
                .subscribe(data => {
                  this.borrowList = data;
                  if (this.borrowList != null) {
                    this.navCtrl.push(ConfirmBorrowPage, { _borrowId: barcodeData.text });
                  }
                  else {
                    this.navCtrl.push(ConfirmReturnPage, { _returnId: barcodeData.text });
                  }
                });
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

    this.http.get<BorrowList>(GlobalVarible.host + "/api/Lender/GetBorrow/" + id)
      .subscribe(data => {
        var borrow = data;
        this.navCtrl.push(RequestBorrowPage, { _borrow: borrow })
      });
  }

  BorrowDetail(borrow: BorrowList) {
    this.navCtrl.push(BorrowDetailPage, { _borrow: borrow });
  }

  ReturnDetail(returnList: ReturnList) {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (barcodeData.text == returnList.lockerId) {
        this.navCtrl.push(RequestReturnPage, { _returnList: returnList });
      }
      else{
        const toast = this.toastCtrl.create({
          message: 'Worng locker. Please scan basket '+ returnList.lockerName,
          duration: 3000
        });
        toast.present();
      }

    }).catch(err => {
      console.log('Error', err);
    });
  }

  Search(){
    this.navCtrl.push(SearchItemsPage);
  }
}
