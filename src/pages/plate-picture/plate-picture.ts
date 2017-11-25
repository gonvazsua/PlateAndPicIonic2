import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlatePicture } from '../../models/plate-picture';
import { LoadingProvider } from '../../providers/loading/loading';
import { PlatePictureProvider } from '../../providers/plate-picture/plate-picture';
import { AlertProvider } from '../../providers/alert/alert';
import { RestaurantPage } from '../restaurant/restaurant';
import { CommentPage } from '../comment/comment';

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

  	/*
      Like or unlike the platepicture passed as parameter
    */
    likeUnlike(platePictureId){

        this.updateLikeUnlike(this.platePicture);

        this.updateIcon(this.platePicture);

    }

    /*
      Save the like or unlike
    */
    updateLikeUnlike(platePicture){

      if(platePicture.likeToUser){

        this.platePictureProvider.unlikePlatePicture(platePicture);

      } else {

        this.platePictureProvider.likePlatePicture(platePicture);

      }

    }

    /*
      Update the icon by changing the value of likeToUser field,
      and update the likesNumber variable
    */
    updateIcon(platePicture){

      if(platePicture.likeToUser){

        platePicture.likeToUser = false;
        platePicture.likesNumber--;

      } else {

        platePicture.likeToUser = true;
        if(platePicture.likesNumber == null){
          platePicture.likesNumber = 1;
        }
        else{
          platePicture.likesNumber++; 
        }

      }

    }

    /*
      Go to comments page
    */
  	goToComments(platePictureId){
  		this.navCtrl.push(CommentPage, {platePictureId: platePictureId});
  	}

}
