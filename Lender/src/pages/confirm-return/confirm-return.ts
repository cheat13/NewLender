import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReturnList, GlobalVarible } from '../../app/models';

@IonicPage()
@Component({
  selector: 'page-confirm-return',
  templateUrl: 'confirm-return.html',
})
export class ConfirmReturnPage {

  returnList: ReturnList = new ReturnList;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmReturnPage');
  }

  ionViewDidEnter() {
    this.http.get<ReturnList>(GlobalVarible.host + "/api/Lender/GetReturnList/" + this.navParams.data._returnId)
      .subscribe(data => {
        this.returnList = data;
      });
  }

  CancelReturn() {
    this.http.post(GlobalVarible.host + "/api/Lender/CancelReturn", this.returnList)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

  ConfirmReturn() {
    this.returnList.buddyId = GlobalVarible.lender.id;
    this.returnList.buddyName = GlobalVarible.lender.name;
    this.http.post(GlobalVarible.host + "/api/Lender/ConfirmReturn", this.returnList)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

}
