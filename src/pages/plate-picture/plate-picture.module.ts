import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlatePicturePage } from './plate-picture';

@NgModule({
  declarations: [
    PlatePicturePage,
  ],
  imports: [
    IonicPageModule.forChild(PlatePicturePage),
  ],
})
export class PlatePicturePageModule {}
