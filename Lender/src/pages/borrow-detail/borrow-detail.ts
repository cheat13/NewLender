import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BorrowList, Lender, GlobalVarible, Item, ReturnList } from '../../app/models';
import { RequestReturnPage } from '../request-return/request-return';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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

  borrowList: BorrowList = new BorrowList;
  lender: Lender = new Lender;
  returnList: ReturnList = new ReturnList;
  barcodeData: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: HttpClient, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowDetailPage');
  }

  ionViewDidEnter() {
    this.borrowList = this.navParams.data._borrow;
    this.lender = GlobalVarible.lender;
    this.returnList.lockerId = this.borrowList.lockerId;
    this.returnList.lockerName = this.borrowList.lockerName;
    this.returnList.lockerCate = this.borrowList.lockerCate;
    this.returnList.returnerId = GlobalVarible.lender.id;
    this.returnList.returnerName = GlobalVarible.lender.name;
  }

  Return() {
    if (this.borrowList.items.find(x => x.returnAmount != 0) == null) {
      const toast = this.toastCtrl.create({
        message: 'Please input return amount.',
        duration: 3000
      });
      toast.present();
    }
    else {
      if (this.borrowList.items.find(x => x.returnAmount > x.borrowAmount || x.returnAmount < 0) == null) {
        this.returnList.borrowListId = this.borrowList.id;
        this.returnList.items = this.borrowList.items;

        this.barcodeScanner.scan().then(barcodeData => {
          console.log('Barcode data', barcodeData);
          if (barcodeData.text == this.returnList.lockerId) {
            this.http.post<ReturnList>(GlobalVarible.host + "/api/Lender/CreateReturn", this.returnList)
              .subscribe(data => {
                this.returnList = data;
                console.log(this.returnList)
                this.navCtrl.push(RequestReturnPage, { _returnList: this.returnList })
              });
          }
          else {
            const toast = this.toastCtrl.create({
              message: 'Worng locker. Please scan basket ' + this.returnList.lockerName,
              duration: 3000
            });
            toast.present();
          }

        }).catch(err => {
          console.log('Error', err);
        });
      }
      else {
        const toast = this.toastCtrl.create({
          message: 'Please check input return amount.',
          duration: 3000
        });
        toast.present();
      }
    }

  }

}
