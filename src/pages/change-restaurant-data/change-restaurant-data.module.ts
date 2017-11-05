import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeRestaurantDataPage } from './change-restaurant-data';

@NgModule({
  declarations: [
    ChangeRestaurantDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeRestaurantDataPage),
  ],
})
export class ChangeRestaurantDataPageModule {}
