import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegalTextPage } from './legal-text';

@NgModule({
  declarations: [
    LegalTextPage,
  ],
  imports: [
    IonicPageModule.forChild(LegalTextPage),
  ],
})
export class LegalTextPageModule {}
