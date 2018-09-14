import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Locker, Item, GlobalVarible } from '../../app/models';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-item-add',
  templateUrl: 'item-add.html',
})
export class ItemAddPage {

  locker: Locker = new Locker;
  item: Item = new Item;
  _item: Item = new Item;

  constructor(public navCtrl: NavController, private camera: Camera, public toastCtrl: ToastController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemAddPage');
    console.log(this.item.img)
  }

  AddItem() {
    this.http.get<Item>(GlobalVarible.host + "/api/Lender/GetItemByName/" + this.item.name)
      .subscribe(data => {
        this._item = data;
        if (this._item == null) {
          if (this.item.name == null || this.item.name == '' || this.item.amount == null || this.item.amount == 0) {
            const toast = this.toastCtrl.create({
              message: 'Please fill in information.',
              duration: 3000
            });
            toast.present();
          }
          else {
            this.http.post(GlobalVarible.host + "/api/Lender/CreateItem", this.item)
              .subscribe(data => {
                this.navCtrl.pop();
              });
          }
        }
        else {
          const toast = this.toastCtrl.create({
            message: 'This name is already.',
            duration: 3000
          });
          toast.present();
        }
      });
  }

  ionViewDidEnter() {
    this.locker = this.navParams.data._locker;
    this.item.locker = this.locker.id;
    this.item.lockerName = this.locker.name;
    this.item.img = "https://image.flaticon.com/icons/svg/189/189334.svg";
  }

  Camera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 150,
      targetHeight: 150,
      saveToPhotoAlbum: false,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.item.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
