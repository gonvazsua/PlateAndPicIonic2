import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlatePage } from './plate';

@NgModule({
  declarations: [
    PlatePage,
  ],
  imports: [
    IonicPageModule.forChild(PlatePage),
  ],
})
export class PlatePageModule {}
