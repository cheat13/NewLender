import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchItemsPage } from './search-items';

@NgModule({
  declarations: [
    SearchItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchItemsPage),
  ],
})
export class SearchItemsPageModule {}
