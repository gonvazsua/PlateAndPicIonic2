import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

	public loader: any;

  	constructor(public loadingCtrl: LoadingController) {
    
  		this.loader = null;

  	}

  	show(){

  		this.loader = this.loadingCtrl.create({
  			spinner: "crescent",
        dismissOnPageChange: true
  		});
    	this.loader.present();

  	}

    hide(){

      if(this.loader != null){
        this.loader.dismiss();
      }

    }

}
