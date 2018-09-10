import { ItemEditPage } from './../item-edit/item-edit';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { Locker, GlobalVarible, Item } from '../../app/models';
import { HttpClient } from '@angular/common/http';
import { ItemAddPage } from '../item-add/item-add';
import { ItemDetailPage } from '../item-detail/item-detail';

@IonicPage()
@Component({
  selector: 'page-locker-detail',
  templateUrl: 'locker-detail.html',
})
export class LockerDetailPage {

  locker: Locker = new Locker;
  items: Item[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.locker = this.navParams.data._locker
  }

  ionViewDidEnter() {
    this.http.get<Item[]>(GlobalVarible.host + "/api/Lender/ListItems/" + this.locker.id)
      .subscribe(data => {
        this.items = data;
        console.log(this.items)
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockerDetailPage');
  }

  AddItem() {
    this.navCtrl.push(ItemAddPage, { _locker: this.locker });
  }

  ItemDetail(id: string) {
    this.navCtrl.push(ItemDetailPage, { _id: id });
  }

  press(ItemID: string, ItemName: string) {

    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Edit',
          icon: 'build',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(ItemEditPage, { _id: ItemID });

          }
        }, {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            console.log('Archive clicked');

            const confirm = this.alertCtrl.create({
              title: 'Delete ' + ItemName + ' ?',
              buttons: [
                {
                  text: 'Cancel',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'Confirm',
                  handler: () => {
                    console.log('Agree clicked');
                    this.http.post(GlobalVarible.host + "/api/Lender/DeleteItem/" + ItemID, {})
                      .subscribe(data => {
                        this.ionViewDidEnter()
                      });
                  }
                }
              ]
            });
            confirm.present();
          }
        },

      ]
    });
    actionSheet.present();
  }


}
