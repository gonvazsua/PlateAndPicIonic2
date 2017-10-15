import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant';
import { Plate } from '../../models/plate';
import { User } from '../../models/user';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { RestaurantPage } from '../restaurant/restaurant';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

export const SEGMENT_RESTAURANT = "segment_restaurant";
export const SEGMENT_PLATE = "segment_plate";
export const SEGMENT_CATEGORY = "segment_category";
export const SEGMENT_USER = "segment_user";
export const MIN_LENGHT_KEY_SEARCH = 4;

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

	private searchSegment:string;
	private keySearch:string;
	private latitude: string;
	private longitude: string;


	//Results lists
	private restaurantList: Array<Object>;
	private userList: Array<User>;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public restaurantProvider: RestaurantProvider,
		public geolocationProvider: GeolocationProvider) {
		
		//Initialize segment to Restaurants
		this.searchSegment = SEGMENT_RESTAURANT;

		this.restaurantList = [];
		this.userList = [];

	}

	/*
		Always executed on view start: Select by restaurant
	*/
	ionViewDidLoad() {
	    
		this.getLocation();

	}

	/*
		Get the selected segment and call to a correspondant search function
	*/
	searchBySegment(){
		
		switch (this.searchSegment) {
			
			case SEGMENT_RESTAURANT:
				
				this.searchRestaurants();
				break;

			case SEGMENT_PLATE:

				//this.searchPlates();
				break;

			case SEGMENT_CATEGORY:

				//this.searchRestaurantsByCategory();
				break;

			case SEGMENT_USER:

				//this.searchUsers();
				break;
			
			default:
				
				console.log("Nothing to show!");
				break;

		}

	}

	/*
		Search restaurant by keySearch
		If keysearch is empty, return a empty list

		If any restaurant has been found in DB, call to API Place
	*/
	searchRestaurants(){

		if(this.keySearch == null 
			||this.keySearch == "" 
			|| this.keySearch.length < MIN_LENGHT_KEY_SEARCH){
			
			this.restaurantList.length = 0;
			return;
		}

		this.restaurantProvider.findRestaurantsByName(this.keySearch, this.latitude, this.longitude).then(
			
			(data) => {

				this.restaurantList = this.buildRestaurantList(data);

			},
			(err) => {

			}
		);

	}

	/*
		Build Restaurant object from json response
  	*/
  	buildRestaurantList(list): Array<Restaurant>{

  		let restaurantList: Array<Restaurant>;
  		let restaurant: Restaurant;

  		restaurantList = [];

  		for(let item of list){

  			restaurant = new Restaurant(item.restaurantId, item.name, item.address, item.phoneNumber,
				item.registeredOn, item.cityId, item.cityName, item.priceAverage, item.picture,
				item.description, item.active, item.categories);
  			restaurantList.push(restaurant);

  		}

  		return restaurantList;

  	}

  	/*
		Go to Restaurant Page
  	*/
  	goToRestaurant(restaurantId){
  		this.navCtrl.push(RestaurantPage, {restaurantId: restaurantId});
  	}

  	/*
		Call to location provider to get coords: latitude, longitude
  	*/
  	getLocation(){

  		this.geolocationProvider.getLocation().then(

  			(data) => {

  				this.updateLocationVar(data);

  			},
  			(err) => {

  				console.log("Problem getting location");
  				this.latitude = null;
  				this.longitude = null;

  			}

  		);

  	}

  	/*
		Update latitude and longitude values
  	*/
  	updateLocationVar(coords){

  		this.latitude = coords.latitude;
  		this.longitude = coords.longitude;
  	
  	}

}
