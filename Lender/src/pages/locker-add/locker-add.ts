import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Locker, GlobalVarible } from '../../app/models';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the LockerAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locker-add',
  templateUrl: 'locker-add.html',
})
export class LockerAddPage {

  locker: Locker = new Locker;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockerAddPage');
  }

  CreateLocker() {
    this.http.post(GlobalVarible.host + "/api/Lender/CreateLocker", this.locker)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }

}
