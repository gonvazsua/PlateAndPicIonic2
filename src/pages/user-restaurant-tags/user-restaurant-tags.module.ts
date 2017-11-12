import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRestaurantTagsPage } from './user-restaurant-tags';

@NgModule({
  declarations: [
    UserRestaurantTagsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRestaurantTagsPage),
  ],
})
export class UserRestaurantTagsPageModule {}
