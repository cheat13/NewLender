import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Lender, GlobalVarible } from '../../app/models';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  lender: Lender = new Lender;
  LanderName: string;
  password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }


  SignUp() {

    if (this.LanderName != null && this.password != null) {

      this.lender.name = this.LanderName.toUpperCase();
      this.lender.password = this.password.toUpperCase();


      this.http.get<Lender>(GlobalVarible.host + "/api/Lender/GetUser/" + this.lender.name)
        .subscribe(data => {
        
          if (data == null) {
            this.http.post(GlobalVarible.host + "/api/Lender/CreateUser", this.lender)
              .subscribe(data => {
                GlobalVarible.lender = this.lender;
                this.navCtrl.push(HomePage);
              });
          }
          else {
            const toast = this.toastCtrl.create({
              message: 'มีชื่อผู้ใช้นี้แล้วในระบบ',
              duration: 3000
            });
            toast.present();
          }

        });
    }

    else {
      const toast = this.toastCtrl.create({
        message: 'กรุณากรอก Username และ Password ให้ครบ',
        duration: 3000
      });
      toast.present();
    }
  }

}
