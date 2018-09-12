import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestBorrowPage } from './request-borrow';

@NgModule({
  declarations: [
    RequestBorrowPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestBorrowPage),
  ],
})
export class RequestBorrowPageModule {}
