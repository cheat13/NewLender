import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Borrow, GlobalVarible } from '../../app/models';
import { ConfirmBorrowPage } from '../confirm-borrow/confirm-borrow';

@IonicPage()
@Component({
  selector: 'page-request-borrow',
  templateUrl: 'request-borrow.html',
})
export class RequestBorrowPage {

  borrow: Borrow = new Borrow;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestBorrowPage');
  }

  ionViewDidEnter() {
    this.borrow = this.navParams.data._borrow;
    console.log(this.borrow)
  }

  CancelBorrow() {
    this.http.post(GlobalVarible.host + "/api/Lender/CancelBorrow", this.borrow)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

  goCfBr(){
    this.navCtrl.push(ConfirmBorrowPage,{_borrow : this.borrow});
  }

}
