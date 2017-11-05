import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlatePicture } from '../../models/plate-picture';
import { LoadingProvider } from '../../providers/loading/loading';
import { PlatePictureProvider } from '../../providers/plate-picture/plate-picture';
import { AlertProvider } from '../../providers/alert/alert';
import { RestaurantPage } from '../restaurant/restaurant';

@IonicPage()
@Component({
  selector: 'page-plate-picture',
  templateUrl: 'plate-picture.html',
})
export class PlatePicturePage {

  private platePicture: PlatePicture;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loading: LoadingProvider,
		public platePictureProvider: PlatePictureProvider,
		public alert: AlertProvider) {
		
		this.platePicture = new PlatePicture();

	}

	ionViewDidLoad() {
	    
		let platePictureId = this.navParams.get('platePictureId');

		this.loadPlatePictureDetails(platePictureId);

	}

	/*
		Load plate picture by the id passed as parameter
	*/
	loadPlatePictureDetails(platePictureId){

		this.loading.show();

		this.platePictureProvider.getPlatePictureById(platePictureId).then(

			(data) => {

				this.platePicture.build(data);
		      	this.loading.hide();

			},
			(err) => {
				this.loading.hide();
				this.alert.show('¡Ups!', err);
			}

		);

	}

	/*
      Go to Restaurants page
    */
  	goToRestaurant(restaurantId){
  		this.navCtrl.push(RestaurantPage, {restaurantId: restaurantId});
  	}

}
