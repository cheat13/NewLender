import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Locker, GlobalVarible } from '../../app/models';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-locker-edit',
  templateUrl: 'locker-edit.html',
})
export class LockerEditPage {

  locker: Locker = new Locker;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.locker = this.navParams.data._locker;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockerEditPage');
  }

  EditLocker() {
    this.http.post(GlobalVarible.host + "/api/Lender/EditLocker", this.locker)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

}

