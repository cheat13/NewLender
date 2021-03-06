import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  _locker: Locker = new Locker;
  add: boolean = false;
  lockers: Locker[];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockerAddPage');
  }

  ionViewDidEnter() {
    this.locker.layer = this.navParams.data._layer;
    this.http.get<Locker[]>(GlobalVarible.host + "/api/Lender/ListLayerLockers/" + this.locker.layer)
      .subscribe(data => {
        this.lockers = data;
        this.locker.name = this.navParams.data._layer + (this.lockers.length + 1).toString();
      });

  }

  CreateLocker() {
    this.add = true;
    this.http.get<Locker>(GlobalVarible.host + "/api/Lender/GetLockerByName/" + this.locker.name)
      .subscribe(data => {
        this._locker = data;
        if (this._locker == null) {
          if (this.locker.name == null || this.locker.name == '' || this.locker.cate == null || this.locker.cate == '') {
            this.add = false;
            const toast = this.toastCtrl.create({
              message: 'Please fill in information.',
              duration: 3000
            });
            toast.present();
          }
          else {
            this.http.post(GlobalVarible.host + "/api/Lender/CreateLocker", this.locker)
              .subscribe(data => {
                this.navCtrl.pop();
              });
          }
        }
        else {
          this.add = false;
          const toast = this.toastCtrl.create({
            message: 'This name is already.',
            duration: 3000
          });
          toast.present();
        }
      });
  }

}
