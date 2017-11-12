import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRestaurantPage } from './user-restaurant';

@NgModule({
  declarations: [
    UserRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRestaurantPage),
  ],
})
export class UserRestaurantPageModule {}
