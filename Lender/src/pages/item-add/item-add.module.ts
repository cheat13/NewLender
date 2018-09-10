import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemAddPage } from './item-add';

@NgModule({
  declarations: [
    ItemAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemAddPage),
  ],
})
export class ItemAddPageModule {}
