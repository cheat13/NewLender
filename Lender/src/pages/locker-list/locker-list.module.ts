import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LockerListPage } from './locker-list';

@NgModule({
  declarations: [
    LockerListPage,
  ],
  imports: [
    IonicPageModule.forChild(LockerListPage),
  ],
})
export class LockerListPageModule {}
