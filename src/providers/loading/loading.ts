import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

	  public loader: any;
    private isActive: boolean;

  	constructor(public loadingCtrl: LoadingController) {
    
  		this.loader = null;
      this.isActive = false;

  	}

  	show(){

      if(!this.isActive){

        this.isActive = true;

        this.loader = this.loadingCtrl.create({
          spinner: "crescent",
          dismissOnPageChange: true
        });
        this.loader.present();

      }

  	}

    hide(){

      if(this.loader != null){
        this.loader.dismiss();
        this.isActive = false;
      }

    }

}
