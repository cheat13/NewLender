import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReturnList, GlobalVarible } from '../../app/models';
import { ConfirmReturnPage } from '../confirm-return/confirm-return';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-request-return',
  templateUrl: 'request-return.html',
})
export class RequestReturnPage {

  returnList: ReturnList = new ReturnList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestReturnPage');
  }

  ionViewDidEnter() {
    this.returnList = this.navParams.data._returnList;
    console.log(this.returnList)
  }

  CancelReturn() {
    this.http.post(GlobalVarible.host + "/api/Lender/CancelReturn", this.returnList)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

  goCfBr() {
    this.navCtrl.push(ConfirmReturnPage, { _returnList: this.returnList });
  }

  goHome(){
    this.navCtrl.push(HomePage);
  }

}
