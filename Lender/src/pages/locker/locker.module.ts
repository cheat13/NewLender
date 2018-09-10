import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LockerPage } from './locker';

@NgModule({
  declarations: [
    LockerPage,
  ],
  imports: [
    IonicPageModule.forChild(LockerPage),
  ],
})
export class LockerPageModule {}
