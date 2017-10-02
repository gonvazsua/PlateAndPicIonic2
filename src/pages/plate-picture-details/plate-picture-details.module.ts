import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlatePictureDetailsPage } from './plate-picture-details';

@NgModule({
  declarations: [
    PlatePictureDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlatePictureDetailsPage),
  ],
})
export class PlatePictureDetailsPageModule {}
