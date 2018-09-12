import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Borrow, Lender, GlobalVarible } from '../../app/models';

/**
 * Generated class for the BorrowDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-borrow-detail',
  templateUrl: 'borrow-detail.html',
})
export class BorrowDetailPage {

  borrow: Borrow = new Borrow;
  lender : Lender = new Lender;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowDetailPage');
  }

  ionViewDidEnter(){
   this.borrow = this.navParams.data._borrow;
   this.lender = GlobalVarible.lender;
  }

}
