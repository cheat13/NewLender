import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BorrowList, GlobalVarible } from '../../app/models';

/**
 * Generated class for the ConfirmBorrowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-borrow',
  templateUrl: 'confirm-borrow.html',
})
export class ConfirmBorrowPage {

  borrow: BorrowList = new BorrowList;
  status: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmBorrowPage');
  }

  ionViewDidEnter() {
    this.http.get<BorrowList>(GlobalVarible.host + "/api/Lender/GetBorrow/" + this.navParams.data._borrowId)
      .subscribe(data => {
        this.borrow = data;
      });
    this.status = false;
  }

  CancelBorrow() {
    this.http.post(GlobalVarible.host + "/api/Lender/CancelBorrow", this.borrow)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

  ConfirmBorrow() {
    this.status = true;
    this.borrow.buddyId = GlobalVarible.lender.id;
    this.borrow.buddyName = GlobalVarible.lender.name;
    this.http.post(GlobalVarible.host + "/api/Lender/ConfirmBorrow", this.borrow)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

}
