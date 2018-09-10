import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LockerEditPage } from './locker-edit';

@NgModule({
  declarations: [
    LockerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(LockerEditPage),
  ],
})
export class LockerEditPageModule {}
