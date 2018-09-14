import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Item, GlobalVarible } from '../../app/models';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-item-edit',
  templateUrl: 'item-edit.html',
})
export class ItemEditPage {

  item: Item = new Item;
  _item: Item = new Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: HttpClient, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditPage');
  }

  ionViewDidEnter() {
    this.http.get<Item>(GlobalVarible.host + "/api/Lender/GetItem/" + this.navParams.data._id)
      .subscribe(data => {
        this.item = data;
        console.log(this.item)
      });
  }

  EditItem() {
    this.http.get<Item>(GlobalVarible.host + "/api/Lender/GetItemByName/" + this.item.name)
      .subscribe(data => {
        this._item = data;
        if (this._item == null) {
          if (this.item.name == '' || this.item.amount == 0) {
            const toast = this.toastCtrl.create({
              message: 'Please fill in information.',
              duration: 3000
            });
            toast.present();
          }
          else {
            this.http.post(GlobalVarible.host + "/api/Lender/EditItem", this.item)
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
