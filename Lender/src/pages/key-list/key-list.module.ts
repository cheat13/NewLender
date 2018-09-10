import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeyListPage } from './key-list';

@NgModule({
  declarations: [
    KeyListPage,
  ],
  imports: [
    IonicPageModule.forChild(KeyListPage),
  ],
})
export class KeyListPageModule {}
