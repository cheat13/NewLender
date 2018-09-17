import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BorrowList, GlobalVarible } from '../../app/models';
import { ConfirmBorrowPage } from '../confirm-borrow/confirm-borrow';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-request-borrow',
  templateUrl: 'request-borrow.html',
})
export class RequestBorrowPage {

  borrow: BorrowList = new BorrowList;
  _borrow: BorrowList = new BorrowList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestBorrowPage');
  }

  ionViewDidEnter() {
    this.borrow = this.navParams.data._borrow;
    console.log(this.borrow)
  }

  CancelBorrow() {
    this.http.get<BorrowList>(GlobalVarible.host + "/api/Lender/GetBorrow/" + this.borrow.id)
      .subscribe(data => {
        this._borrow = data;
        if (this._borrow.buddyId == null) {
          this.http.post(GlobalVarible.host + "/api/Lender/CancelBorrow", this.borrow)
            .subscribe(data => {
              this.navCtrl.pop();
            });
        }
        else {
          const toast = this.toastCtrl.create({
            message: 'Can not cancel. Lender borrow already.',
            duration: 3000
          });
          toast.present();
        }
      });
  }

  goCfBr() {
    this.navCtrl.push(ConfirmBorrowPage, { _borrow: this.borrow });
  }

  goHome() {
    this.navCtrl.push(HomePage);
  }

}
