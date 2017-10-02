import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlatePictureProvider } from '../../providers/plate-picture/plate-picture';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	private userPlatePictures: Array<Object>;
	private page: number;
	private user: User;

	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
	  	public platePictureProvider: PlatePictureProvider,
	  	public userProvider: UserProvider,
      public loading: LoadingProvider,
      public alert: AlertProvider) {

		this.userPlatePictures = []; 
		this.page = 0; 
		this.user = new User(null, null, null, null, null, null, null);

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

  	}

  	/*
		Load user by userId and their platepictures
  	*/
  	loadUserByIdAndPlatePictures(userId){

  		this.userProvider.getUserById(userId).then(
  			(data) => {

  				this.user = this.user.build(data);
  				this.loadPlatePictures();

  			},
  			(err) => {
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

  		this.userProvider.getLoggedUser().then(
  			(data) => {

  				this.user = this.user.build(data);
  				this.loadPlatePictures();

  			},
  			(err) => {
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

      this.platePictureProvider.getPlatePicturesByUser(this.user, this.page).then(

        (data) => {
          this.userPlatePictures.push(data);

          if(data){
            this.incrementPage();
          }

        },
        (err) => {
          this.page = 0;
          console.log("Error in loadLoggedUserAndPlatePictures" + err);
          this.alert.show("¡Ups!",err);
        }

      );
  		
  	}

    /*
      Increment the current page query
    */
    incrementPage(){
      this.page = this.page + 1;
    }
}
