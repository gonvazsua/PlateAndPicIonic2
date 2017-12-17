import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-legal-text',
  templateUrl: 'legal-text.html',
})
export class LegalTextPage {

  	constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams,
  		public viewCtrl: ViewController) {

  	}

  	/*
		Close modal
  	*/
  	dismissModal(){

  		this.viewCtrl.dismiss();

  	}

}
