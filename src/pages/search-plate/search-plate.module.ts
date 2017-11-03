import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPlatePage } from './search-plate';

@NgModule({
  declarations: [
    SearchPlatePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPlatePage),
  ],
})
export class SearchPlatePageModule {}
