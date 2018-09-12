import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmBorrowPage } from './confirm-borrow';

@NgModule({
  declarations: [
    ConfirmBorrowPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmBorrowPage),
  ],
})
export class ConfirmBorrowPageModule {}
