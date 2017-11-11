import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { AlertProvider } from '../../providers/alert/alert';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { UploadPicturePage } from '../../pages/upload-picture/upload-picture';

export const MIN_LENGHT_KEY_SEARCH = 4;

@IonicPage()
@Component({
  selector: 'page-search-restaurant',
  templateUrl: 'search-restaurant.html',
})
export class SearchRestaurantPage {

	private keySearch: string;
	private latitude: number;
	private longitude: number;
	private blockedSearch: boolean;
	private restaurantList: Array<Restaurant>;
	private selectedRestaurant: Restaurant;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
      public viewCtrl: ViewController,
  		public geolocationProvider: GeolocationProvider,
  		public alertProvider: AlertProvider,
  		public restaurantProvider: RestaurantProvider) {

  		this.restaurantList = [];
  		
  		this.keySearch = null;
  		this.latitude = null;
  		this.longitude = null;
  		this.blockedSearch = false;
  		this.selectedRestaurant = null;

  	}

  	/*
		Executed when view is ready
  	*/
  	ionViewDidLoad() {

    	this.getLocation();
  	
  	}

  	/*
		Get the location calling to Geolocation provider
  	*/
  	getLocation(){

  		this.geolocationProvider.getLocation().then(

  			(data) => {
  				this.setLocation(data);
  			},
  			(err) => {
  				this.latitude = null;
  				this.longitude = null;
  			}

  		);

  	}

  	/*
		Set the currents coords
  	*/
  	setLocation(coords){
  		this.latitude = coords.latitude;
  		this.longitude = coords.longitude;
  	}

  	/*
		Search restaurant by name
  	*/
  	searchRestaurant(){

  		if(this.blockedSearch || this.keySearch.length < MIN_LENGHT_KEY_SEARCH){
  			return;
  		}

  		this.blockedSearch = true;

		  this.restaurantProvider.findRestaurantsByName(this.keySearch, this.latitude, this.longitude).then(
			
  			(data) => {

  				if(data != null){
  					let restaurant = new Restaurant();
  					this.restaurantList = restaurant.buildFromList(data);
  				}

  				this.blockedSearch = false;

  			},
  			(err) => {
  				this.blockedSearch = false;
  				this.restaurantList.length = 0;
  			}
  		);

  	}

    /*
      Save restaurant if not exists, and redirect to Upload Page
    */
    selectAndGoToUpload(){

      if(this.selectedRestaurant.restaurantId == null 
        || this.selectedRestaurant.restaurantId == 0){

        this.saveRestaurantAndRedirect();

      } else {

         this.redirectToBack();

      }

    }

    /*
      Set the params, redirect to Upload Page and clear selected restaurant
    */
    redirectToBack(){

      this.viewCtrl.dismiss(this.selectedRestaurant);

    }

    /*
      Save restaurant and redirect to Restaurant page
    */
    saveRestaurantAndRedirect(){
      
      this.restaurantProvider.saveRestaurant(this.selectedRestaurant).then(
        
        (data) => {

          this.selectedRestaurant = new Restaurant();
          this.selectedRestaurant.build(data);
          this.redirectToBack();

        },
        (err) => {
          console.log("Error saving restaurant")
          this.alertProvider.show("¡Ups!",err);
        }
      );

    }

    /*
      Mark restaurant row as selected adding the class "selected",
      and update the selectedRestaurant variable
    */
    selectRestaurant(index, event){

      this.clearSelected();

      this.selectedRestaurant = this.restaurantList[index];

      event.currentTarget.classList.add("selected");

    }

    /*
      Loop over all elements having the "result" class remove the "selected" one
    */
    clearSelected(){

      let elems = document.querySelectorAll(".result");

      for(let i = 0; i < elems.length; i++){

        let elem = elems[i];
        elem.classList.remove("selected");

      }

    }

}
