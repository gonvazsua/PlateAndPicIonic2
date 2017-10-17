import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant';
import { Plate } from '../../models/plate';
import { User } from '../../models/user';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { RestaurantPage } from '../restaurant/restaurant';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { AlertProvider } from '../../providers/alert/alert';
import { PlateProvider } from '../../providers/plate/plate';
import { UserProvider } from '../../providers/user/user';
import { ProfilePage } from '../profile/profile';

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
	private blockedSearch: boolean;
	private isLoading: boolean;


	//Results lists
	private restaurantList: Array<Restaurant>;
	private plateList: Array<Plate>;
	private userList: Array<User>;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public restaurantProvider: RestaurantProvider,
		public geolocationProvider: GeolocationProvider,
		public alertProvider: AlertProvider,
		public plateProvider: PlateProvider,
		public userProvider: UserProvider) {
		
		//Initialize segment to Restaurants
		this.searchSegment = SEGMENT_RESTAURANT;

		this.restaurantList = [];
		this.plateList = [];
		this.userList = [];
		this.blockedSearch = false;
		this.isLoading = false;

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

				this.searchPlates();
				break;

			case SEGMENT_CATEGORY:

				//this.searchRestaurantsByCategory();
				break;

			case SEGMENT_USER:

				this.searchUsers();
				break;
			
			default:
				
				console.log("Nothing to show!");
				break;

		}

	}

	/*
		Search restaurant by keySearch
		If keysearch is empty, return a empty list
	*/
	searchRestaurants(){

		if(this.searchIsBlocked()){
			this.restaurantList.length = 0;
			return;
		}

		this.blockedSearch = true;
		this.isLoading = true;

		this.restaurantProvider.findRestaurantsByName(this.keySearch, this.latitude, this.longitude).then(
			
			(data) => {

				this.blockedSearch = false;

				if(data != null)
					this.restaurantList = this.buildRestaurantList(data);

				this.isLoading = false;

			},
			(err) => {
				this.blockedSearch = false;
				this.restaurantList.length = 0;
				this.isLoading = false;
			}
		);

	}

	/*
		Search plates by keySearch
		If keysearch is empty, return a empty list
	*/
	searchPlates(){

		if(this.searchIsBlocked()){
			this.plateList.length = 0;
			return;
		}

		this.blockedSearch = true;
		this.isLoading = true;

		//Currently, always page = 0
		let page = 0;

		this.plateProvider.findPlatesByName(this.keySearch, page).then(
			
			(data) => {

				this.blockedSearch = false;

				if(data != null)
					this.plateList = this.buildPlateList(data);

				this.isLoading = false;

			},
			(err) => {
				this.blockedSearch = false;
				this.plateList.length = 0;
				this.isLoading = false;
			}
		);

	}

	/*
		Search users by keySearch
		If keysearch is empty, return a empty list
	*/
	searchUsers(){

		if(this.searchIsBlocked()){
			this.userList.length = 0;
			return;
		}

		this.blockedSearch = true;
		this.isLoading = true;

		//Currently, always page = 0
		let page = 0;

		this.userProvider.findUsers(this.keySearch, page).then(
			
			(data) => {

				this.blockedSearch = false;

				if(data != null)
					this.userList = this.buildUserList(data);

				this.isLoading = false;

			},
			(err) => {
				this.blockedSearch = false;
				this.userList.length = 0;
				this.isLoading = false;
			}
		);

	}

	/*
		Search is blocked when there is not response from api call
		or the keySearch is empty or is shorter than 4 chars
	*/
	searchIsBlocked(){

		let isNotPossible = this.keySearch == null 
			|| this.keySearch == "" 
			|| this.keySearch.length < MIN_LENGHT_KEY_SEARCH;


		return isNotPossible || this.blockedSearch;

	}

	/*
		Build Restaurant object from json response
  	*/
  	buildRestaurantList(list): Array<Restaurant>{

  		let restaurantList: Array<Restaurant>;
  		let restaurant: Restaurant;

  		restaurantList = [];

  		for(let item of list){

  			restaurant = this.buildRestaurant(item);
  			restaurantList.push(restaurant);

  		}

  		return restaurantList;

  	}

  	/*
		Build Restaurant object from json response
  	*/
  	buildRestaurant(item): Restaurant {

  		let restaurant: Restaurant;

  		restaurant = new Restaurant(item.restaurantId, item.name, item.address, item.phoneNumber,
			item.registeredOn, item.cityId, item.cityName, item.priceAverage, item.picture,
			item.description, item.active, item.categories, item.latitude, item.longitude,
			item.apiPlaceId, item.rating);

  		return restaurant;

  	}

  	/*
		Build Plate objects list from json response
  	*/
  	buildPlateList(list): Array<Plate>{

  		let plateList: Array<Plate>;
  		let plate: Plate;

  		plateList = [];

  		for(let item of list){

  			plate = this.buildPlate(item);
  			plateList.push(plate);

  		}

  		return plateList;

  	}

  	/*
		Build Plate object from json response
  	*/
  	buildUser(item): User {

  		let user: User;

  		user = new User(item.userId, item.firstname, item.lastname, item.username, item.email,
  			item.picture, item.target, item.restaurantId);

  		return user;

  	}

  	/*
		Build User objects list from json response
  	*/
  	buildUserList(list): Array<User>{

  		let userList: Array<User>;
  		let user: User;

  		userList = [];

  		for(let item of list){

  			user = this.buildUser(item);
  			userList.push(user);

  		}

  		return userList;

  	}

  	/*
		Build Plate object from json response
  	*/
  	buildPlate(item): Plate {

  		let plate: Plate;

  		plate = new Plate(item.plateId, item.plateName, item.restaurantId, item.restaurantName,
  			item.plateType, item.plateActive);

  		return plate;

  	}

  	/*
		Save restaurant if not exists, and redirect to Restaurant Page
  	*/
  	saveAndGoToRestaurant(restaurantId, plateId){

  		if(restaurantId == null || restaurantId == 0){

  			this.saveRestaurantAndRedirect(restaurantId);

  		} else {

  			let params = {
  				restaurantId: restaurantId,
  				plateId: plateId
  			};

  			this.navCtrl.push(RestaurantPage, params);

  		}

  	}

  	/*
		Save restaurant and redirect to Restaurant page
  	*/
  	saveRestaurantAndRedirect(restaurantId){

  		let restaurant: Restaurant = this.getRestaurantFromList(restaurantId);
  		
  		this.restaurantProvider.saveRestaurant(restaurant).then(
  			
  			(data) => {
  				let restaurant: Restaurant = this.buildRestaurant(data);
  				this.navCtrl.push(RestaurantPage, {restaurantId: restaurant.restaurantId});
  			},
  			(err) => {
  				console.log("Error saving restaurant")
  				this.alertProvider.show("¡Ups!",err);
  			}
  		);
  	}

  	/*
		Get restaurant by id from restaurant list
  	*/
  	getRestaurantFromList(restaurantId){

  		let restaurant: Restaurant;

  		for(let r of this.restaurantList){
  			if(r.restaurantId == restaurantId){
  				restaurant = r;
  				break;
  			}
  		}

  		return restaurant;

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

  	/*
		Go to the Profile page
    */
    goToProfile(userId){
    	this.navCtrl.push(ProfilePage, {userId: userId});
    }

}
