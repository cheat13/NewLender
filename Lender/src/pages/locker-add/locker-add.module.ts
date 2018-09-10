import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LockerAddPage } from './locker-add';

@NgModule({
  declarations: [
    LockerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(LockerAddPage),
  ],
})
export class LockerAddPageModule {}
