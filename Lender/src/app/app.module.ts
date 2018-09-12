import { LoginPage } from './../pages/login/login';
import { LockerListPage } from './../pages/locker-list/locker-list';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { ItemAddPage } from '../pages/item-add/item-add';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { LockerPage } from '../pages/locker/locker';
import { LockerDetailPage } from '../pages/locker-detail/locker-detail';
import { LockerAddPage } from '../pages/locker-add/locker-add';
import { LockerEditPage } from '../pages/locker-edit/locker-edit';
import { ItemEditPage } from '../pages/item-edit/item-edit';
import { KeyListPage } from '../pages/key-list/key-list';
import { ConfirmBorrowPage } from '../pages/confirm-borrow/confirm-borrow';
import { RequestBorrowPage } from '../pages/request-borrow/request-borrow';
import { BorrowDetailPage } from '../pages/borrow-detail/borrow-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemAddPage,
    ItemDetailPage,
    LockerPage,
    LockerDetailPage,
    LockerAddPage,
    LockerEditPage,
    ItemEditPage,
    LockerListPage,
    LoginPage,
    KeyListPage,
    ConfirmBorrowPage,
    RequestBorrowPage,
    BorrowDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemAddPage,
    ItemDetailPage,
    LockerPage,
    LockerDetailPage,
    LockerAddPage,
    LockerEditPage,
    ItemEditPage,
    LockerListPage,
    LoginPage,
    KeyListPage,
    ConfirmBorrowPage,
    RequestBorrowPage,
    BorrowDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    BarcodeScanner,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
