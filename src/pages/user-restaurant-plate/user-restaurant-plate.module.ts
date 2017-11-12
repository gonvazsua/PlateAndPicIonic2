import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRestaurantPlatePage } from './user-restaurant-plate';

@NgModule({
  declarations: [
    UserRestaurantPlatePage,
  ],
  imports: [
    IonicPageModule.forChild(UserRestaurantPlatePage),
  ],
})
export class UserRestaurantPlatePageModule {}
