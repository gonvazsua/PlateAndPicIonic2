import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlatePictureProvider } from '../../providers/plate-picture/plate-picture';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { PlatePicturePage } from '../../pages/plate-picture/plate-picture';
import { Follows } from '../../models/follows';
import { FollowsProvider } from '../../providers/follows/follows';

export const PAGE_SIZE = 20;

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	private userPlatePictures: Array<Object>;
	private page: number;
	private user: User;
  private followersInformation: Follows;
  private loadingAdditionalInfo: boolean;

	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
	  	public platePictureProvider: PlatePictureProvider,
	  	public userProvider: UserProvider,
      public loading: LoadingProvider,
      public alert: AlertProvider,
      public followsProvider: FollowsProvider) {

		this.userPlatePictures = []; 
		this.page = 0; 
		this.user = new User();
    this.followersInformation = null;
    this.loadingAdditionalInfo = false;

	}

	/*
		Always executed on view load
	*/
  	ionViewDidLoad() {
    	
  		this.getUserAndLoadPlatePictures();

  	}

  	/*
		Check if param userId exists:
			- No: Load user by Id and their platepictures
			- Yes: Load logged user and their platepictures
  	*/
  	getUserAndLoadPlatePictures(){

      let userId = this.navParams.get('userId');

  		if(userId){

  			this.loadUserByIdAndPlatePictures(userId);
  		
  		} else {

  			this.loadLoggedUserAndPlatePictures();

  		}

      this.loadFollwersAndData(userId);

  	}

  	/*
		Load user by userId and their platepictures
  	*/
  	loadUserByIdAndPlatePictures(userId){

      this.loading.show();

  		this.userProvider.getUserById(userId).then(
  			(data) => {

  				this.user.build(data);
  				this.loadPlatePictures();
          this.loading.hide();

  			},
  			(err) => {
          this.loading.hide();
  				this.page = 0;
          console.log("Error in loadUserByIdAndPlatePictures" + err);
  				this.alert.show("¡Ups!",err);
  			}
  		);
  	}

  	/*
		Load the logged user and their platepictures
  	*/
  	loadLoggedUserAndPlatePictures(){

      this.loading.show();

  		this.userProvider.getLoggedUser().then(
  			(data) => {

  				this.user.build(data);
  				this.loadPlatePictures();
          this.loading.hide();

  			},
  			(err) => {
          this.loading.hide();
          this.page = 0;
  				console.log("Error in loadLoggedUserAndPlatePictures" + err);
  				this.alert.show("¡Ups!",err);
  			}
  		);	

  	}

  	/*
		Load user platePictures filtering by page
  	*/
  	loadPlatePictures(){

      this.loading.show();

      this.platePictureProvider.getPlatePicturesByUser(this.user, this.page).then(

        (data) => {
          
          this.addPlatePictures(data);
          this.incrementPage(data);
          this.loading.hide();

        },
        (err) => {
          this.loading.hide();
          this.page = 0;
          console.log("Error in loadLoggedUserAndPlatePictures" + err);
          this.alert.show("¡Ups!",err);
        }

      );
  		
  	}

    /*
      Add the data to PlatePicture list
    */
    addPlatePictures(data){

      for(let platePicture of data){

        this.userPlatePictures.push(platePicture);

      }

    }

    /*
      Increment the current query page only if dataLength is equals to PAGE_SIZE constant
    */
    incrementPage(data){
    
      if(data.length == PAGE_SIZE){
        this.page = this.page + 1;
      }

    }

    /*
      Go to details page of the selected Plate picture
    */
    goToPlatePictureDetails(platePictureId){

      this.navCtrl.push(PlatePicturePage, {platePictureId: platePictureId});

    }

    /*
      Load the followers, publications and following data
    */
    loadFollwersAndData(userId){

      this.loadingAdditionalInfo = true;

      this.followsProvider.loadByUserId(userId).then(

        (data) => {

          this.followersInformation = new Follows();
          this.followersInformation.build(data);
          this.followersInformation.updateTransformationNumber();
          this.loadingAdditionalInfo = false;

        },
        (err) => {

          console.log("Error loading Followers and data: " + err);
          this.loadingAdditionalInfo = false;
          this.followersInformation = new Follows();

        }

      );

    }

    /*
      Follow to the user from the followersInformation object
    */
    follow(){

      this.followsProvider.follow(this.followersInformation).then(

        (data) => {
          this.followersInformation.isFollowing = true;
          this.followersInformation.followersNumber++;
          this.followersInformation.updateTransformationNumber();
        },
        (err) => {
          console.log("Error following to user: " + err);
        }

      );

    }

    /*
      Follow to the user from the followersInformation object
    */
    unfollow(){

      this.followsProvider.unfollow(this.followersInformation).then(

        (data) => {
          this.followersInformation.isFollowing = false;
          this.followersInformation.followersNumber--;
          this.followersInformation.updateTransformationNumber();
        },
        (err) => {
          console.log("Error unfollowing to user: " + err);
        }

      );

    }

}
