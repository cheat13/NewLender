import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { LockerDetailPage } from '../locker-detail/locker-detail';
import { HttpClient } from '@angular/common/http';
import { Locker, GlobalVarible, Item } from '../../app/models';
import { LockerAddPage } from '../locker-add/locker-add';
import { LockerEditPage } from '../locker-edit/locker-edit';

@IonicPage()
@Component({
  selector: 'page-locker',
  templateUrl: 'locker.html',
})
export class LockerPage {

  locker: Locker[];
  items: Item[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockerPage');
  }

  ionViewDidEnter() {
    this.http.get<Locker[]>(GlobalVarible.host + "/api/Lender/ListLockers")
      .subscribe(data => {
        this.locker = data;
      });

  }

  AddLocker() {
    this.navCtrl.push(LockerAddPage);
  }

  lockerDetail(locker: Locker) {
    this.navCtrl.push(LockerDetailPage, { _locker: locker })
  }

  press(Locker: Locker) {

    this.http.get<Item[]>(GlobalVarible.host + "/api/Lender/ListItems/" + Locker.id)
      .subscribe(data => {
        this.items = data;
        console.log(this.items)
      });

    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Edit',
          icon: 'build',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(LockerEditPage, { _locker: Locker })

          }
        }, {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            console.log('Archive clicked');

            if (this.items.find(x => x.id != null) == null) {
              const confirm = this.alertCtrl.create({
                title: 'Delete Locker ' + Locker.name + ' ?',
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
                      this.http.post(GlobalVarible.host + "/api/Lender/DeleteLocker/" + Locker.id, {})
                        .subscribe(data => {
                          this.ionViewDidEnter()
                        });
                    }
                  }
                ]
              });
              confirm.present();
            }

            else {
              const toast = this.toastCtrl.create({
                message: 'Can not Delete.',
                duration: 3000
              });
              toast.present();
            }

          }
        },

      ]
    });
    actionSheet.present();
  }


}
