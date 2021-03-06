import { HomePage } from './../home/home';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Lender, GlobalVarible } from '../../app/models';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  lender: Lender = new Lender;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login() {
    this.http.get<Lender>(GlobalVarible.host + "/api/Lender/GetUser/" + this.name)
      .subscribe(data => {
        this.lender = data;
        if (this.lender == null) {
          this.lender = new Lender;
          this.lender.name = this.name;

          this.http.post<Lender>(GlobalVarible.host + "/api/Lender/CreateUser", this.lender)
            .subscribe(data => {
              this.lender = data;
              GlobalVarible.lender = this.lender;
              this.navCtrl.push(HomePage);
            });
        }
        else {
          GlobalVarible.lender = this.lender;
          this.navCtrl.push(HomePage);
        }
      });
  }
}
