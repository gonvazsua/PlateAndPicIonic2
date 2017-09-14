import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeProfilePicturePage } from './change-profile-picture';

@NgModule({
  declarations: [
    ChangeProfilePicturePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeProfilePicturePage),
  ],
})
export class ChangeProfilePicturePageModule {}
