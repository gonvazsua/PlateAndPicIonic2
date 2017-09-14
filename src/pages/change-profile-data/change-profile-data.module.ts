import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeProfileDataPage } from './change-profile-data';

@NgModule({
  declarations: [
    ChangeProfileDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeProfileDataPage),
  ],
})
export class ChangeProfileDataPageModule {}
