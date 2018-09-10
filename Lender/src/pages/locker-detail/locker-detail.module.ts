import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LockerDetailPage } from './locker-detail';

@NgModule({
  declarations: [
    LockerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LockerDetailPage),
  ],
})
export class LockerDetailPageModule {}
