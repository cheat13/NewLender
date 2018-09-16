import { HomePage } from './../home/home';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Lender, GlobalVarible } from '../../app/models';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  lender: Lender = new Lender;
  lenderName : string;
  password : string;
  login: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login() {
    this.login = true;
    // if (this.name != null) {
    //   this.http.get<Lender>(GlobalVarible.host + "/api/Lender/GetUser/" + this.name)
    //     .subscribe(data => {
    //       this.lender = data;
    //       if (this.lender == null) {
    //         this.lender = new Lender;
    //         this.lender.name = this.name;

    //         this.http.post<Lender>(GlobalVarible.host + "/api/Lender/CreateUser", this.lender)
    //           .subscribe(data => {
    //             this.lender = data;
    //             GlobalVarible.lender = this.lender;
    //             this.navCtrl.push(HomePage);
    //           });
    //       }
    //       else {
    //         GlobalVarible.lender = this.lender;
    //         this.navCtrl.push(HomePage);
    //       }
    //     });
    // }
    // else {
    //   this.login = false;
    //   const toast = this.toastCtrl.create({
    //     message: 'Please input username.',
    //     duration: 3000
    //   });
    //   toast.present();
    // }

    if (this.lenderName != null && this.password != null) {
      this.lender.name = this.lenderName.toUpperCase();
      this.lender.password = this.password.toUpperCase();

      this.http.get<Lender>(GlobalVarible.host + "/api/Lender/GetUser/" + this.lender.name)
        .subscribe(data => {
          if (data == null) {
            this.login = false;
            const toast = this.toastCtrl.create({
              message: 'This Username can not found.',
              duration: 3000
            });
            toast.present();

          }
          else {
            if (data.name == this.lender.name && data.password == this.lender.password) {
              GlobalVarible.lender = this.lender;
              this.navCtrl.push(HomePage);
            }
            else {
              this.login = false;
              const toast = this.toastCtrl.create({
                message: 'Username or Password invalid.',
                duration: 3000
              });
              toast.present();
            }

          }


        });
    }
    else {
      this.login = false;
      const toast = this.toastCtrl.create({
        message: 'Please enter Username and Password to complete.',
        duration: 3000
      });
      toast.present();
    }
  }

  SignUp() {
    this.navCtrl.push(SignUpPage);
  }

}
