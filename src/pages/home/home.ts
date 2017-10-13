import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { RestaurantPage } from '../restaurant/restaurant';
import { ProfilePage } from '../profile/profile';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { PlatePictureProvider } from '../../providers/plate-picture/plate-picture';
import { PlatePicture } from '../../models/plate-picture';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    private page: number;
    private lastPlatePictures: Array<PlatePicture>;

  	constructor(
      public navCtrl: NavController,
      public platePictureProvider: PlatePictureProvider,
      public loading: LoadingProvider,
      public alert: AlertProvider) {

      this.page = 0;
      this.lastPlatePictures = [];

  	}

    /*
      Always executed when view loads:
        1. Load last platePictures
    */
    ionViewDidLoad() {
      
      this.getLastPlatePictures();

    }

    /*
      Load list with last platepictures
    */
    getLastPlatePictures(){

      this.platePictureProvider.getLastPlatePictures(this.page).then(

        (data) => {

          this.appendPlatePictures(data);

          this.incrementPage(data);

        },
        (err) => {
          this.page = 0;
          console.log("Error in getLastPlatePictures" + err);
          this.alert.show("¡Ups!",err);
        }

      );

    }

    /*
      Push a platePictureList into lastPlatePictures array
    */
    appendPlatePictures(platePicturesList){

      for(let platePicture of platePicturesList){
        this.lastPlatePictures.push(platePicture);
      }

    }

    /*
      Increment the current query page if the length of data is higher than
      the row limit of PlatePictures
    */
    incrementPage(data){

      if(data.length == this.platePictureProvider.getRowLimit()){
        this.page = this.page + 1;
      }

    }

    /*
      Go to comments page
    */
  	goToComments(platePictureId){
  		this.navCtrl.push(CommentPage, {platePictureId: platePictureId});
  	}

    /*
      Go to Restaurants page
    */
  	goToRestaurant(restaurantId){
  		this.navCtrl.push(RestaurantPage, {restaurantId: restaurantId});
  	}

    /*
      Go to the profile with userId
    */
    goToProfile(userId){
       this.navCtrl.push(ProfilePage, {userId: userId}); 
    }

    /*
      Like or unlike the platepicture passed as parameter
    */
    likeUnlike(platePictureId){

      let platePicture = this.getPlatePictureFromListById(platePictureId);

      if(platePicture){

        this.updateLikeUnlike(platePicture);

        this.updateIcon(platePicture);

      }


    }

    /*
      Return the platePicture object with the Id passed as parameter
    */
    getPlatePictureFromListById(platePictureId): PlatePicture {

      let platePicture = null;

      for(let pp of this.lastPlatePictures){

        if(pp.platePictureId == platePictureId){
          platePicture = pp;
        }

      }

      return platePicture;

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

}
