import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AlertProvider {

  	constructor(public alertCtrl: AlertController) {
    
  	}

  	show(title, message){

  		let alert = this.alertCtrl.create({
        	title: title,
        	subTitle: message,
        	buttons: ['OK']
      	});

      	alert.present();

  	}

}
