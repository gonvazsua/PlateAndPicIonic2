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
import { CategoryProvider } from '../../providers/categories/categories';
import { Category } from '../../models/category';
import { City } from '../../models/city';
import { CityProvider } from '../../providers/city/city';

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
	private blockedSearch: boolean;
	private isLoading: boolean;
	private keySearchCategory: string;
	private keySearchCity: string;
	private selectedCategory: Category;
	private selectedCity: City;

	//Results lists
	private restaurantList: Array<Restaurant>;
	private plateList: Array<Plate>;
	private userList: Array<User>;
	private categoriesList: Array<Category>;
	private cityList: Array<City>;
	private restaurantsCategoriesList: Array<Restaurant>;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public restaurantProvider: RestaurantProvider,
		public geolocationProvider: GeolocationProvider,
		public alertProvider: AlertProvider,
		public plateProvider: PlateProvider,
		public userProvider: UserProvider,
		public categoryProvider: CategoryProvider,
		public cityProvider: CityProvider) {
		
		//Initialize segment to Restaurants
		this.searchSegment = SEGMENT_RESTAURANT;

		this.restaurantList = [];
		this.plateList = [];
		this.userList = [];
		this.categoriesList = [];
		this.blockedSearch = false;
		this.isLoading = false;
		this.keySearchCategory = "";
		this.keySearchCity = "";
		this.selectedCategory = new Category();
		this.selectedCity = new City();
		this.cityList = [];
		this.restaurantsCategoriesList = [];

	}

	/* **********************************************************************
					MAIN METHODS
	*************************************************************************/

	/*
		Get the selected segment and call to a correspondant search function
		SEGMENT_CATEGORY: Nothing to do, it has his own logic
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

				this.resetCategorySearch();
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

		It has been decided that latitude and longitude are not used in this page
	*/
	searchRestaurants(){

		if(this.searchIsBlocked()){
			this.restaurantList.length = 0;
			return;
		}

		this.blockedSearch = true;
		this.isLoading = true;

		this.restaurantProvider.findRestaurantsByName(this.keySearch, null, null).then(
			
			(data) => {

				this.blockedSearch = false;

				if(data != null){
					let restaurant = new Restaurant();
					this.restaurantList = restaurant.buildFromList(data);
				}

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

				if(data != null){
					let plate: Plate = new Plate();
					this.plateList = plate.buildFromList(data);
				}

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

				if(data != null){
					let user = new User();
					this.userList = user.buildFromList(data);
				}

				this.isLoading = false;

			},
			(err) => {
				this.blockedSearch = false;
				this.userList.length = 0;
				this.isLoading = false;
			}
		);

	}

	/* **********************************************************************
					AUXILIAR METHODS
	*************************************************************************/

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
		Save restaurant and redirect to Restaurant page
  	*/
  	saveRestaurantAndRedirect(index){

  		let restaurant: Restaurant = this.restaurantList[index];
  		
  		this.restaurantProvider.saveRestaurant(restaurant).then(
  			
  			(data) => {
  				let restaurant: Restaurant = new Restaurant();
  				restaurant.build(data);
  				this.navCtrl.push(RestaurantPage, {restaurantId: restaurant.restaurantId});
  			},
  			(err) => {
  				console.log("Error saving restaurant")
  				this.alertProvider.show("¡Ups!",err);
  			}
  		);
  	}

    /*
		Search results by category and city name, only if they are not empty
    */
	checkSearchRestaurantsByCityAndCategories(){

		if(this.selectedCategory.categoryId == 0 || this.selectedCity.cityId == 0){
			return;
		}

		this.blockedSearch = true;
		this.isLoading = true;

		this.restaurantProvider.findRestaurantsByCityAndCategory(this.selectedCity.cityId,
			this.selectedCategory.categoryId).then(
			
			(data) => {

				this.blockedSearch = false;

				if(data != null){
					let restaurant = new Restaurant();
					this.restaurantsCategoriesList = restaurant.buildFromList(data);
				}

				this.isLoading = false;

			},
			(err) => {
				this.blockedSearch = false;
				this.restaurantsCategoriesList.length = 0;
				this.isLoading = false;
			}
		);

	}

  	/* **********************************************************************
					PAGE EVENTS FUNCTIONS
	*************************************************************************/

  	/*
		Save restaurant if not exists, and redirect to Restaurant Page
  	*/
  	saveAndGoToRestaurant(restaurantId, plateId, index){

  		if(restaurantId == null || restaurantId == 0){

  			this.saveRestaurantAndRedirect(index);

  		} else {

  			let params = {
  				restaurantId: restaurantId,
  				plateId: plateId
  			};

  			this.navCtrl.push(RestaurantPage, params);

  		}

  	}

  	/*
		Go to the Profile page
    */
    goToProfile(userId){
    	this.navCtrl.push(ProfilePage, {userId: userId});
    }

    /*
		Search a list of categories
    */
    searchCategories(){

    	this.categoriesList.length = 0;
    	this.cityList.length = 0;
    	this.restaurantsCategoriesList.length = 0;

    	if(this.keySearchCategory == null || this.keySearchCategory.length < 4){
    		return;
    	}

    	this.isLoading = true;
    	this.selectedCategory.categoryId = 0;
    	this.selectedCategory.categoryName = "";

    	this.categoryProvider.findByName(this.keySearchCategory).then(
    		(data) => {
    			let category = new Category();
    			this.categoriesList = category.buildFromList(data);
    			this.isLoading = false;
    		},
    		(err) => {
    			this.categoriesList.length = 0;
    			this.isLoading = false;
    		}
    	);

    }

    /*
		Clear the correspondant Tag for showing the form
    */
    removeTag(type){

    	if(type == 'city'){
    		this.selectedCity.cityId = 0;
    		this.selectedCity.cityName = "";
    		this.keySearchCity = "";
    	}

    	if(type == 'category'){
    		this.selectedCategory.categoryId = 0;
    		this.selectedCategory.categoryName = "";
    		this.keySearchCategory = "";
    	}

    	this.restaurantsCategoriesList.length = 0;

    }

    /*
		Get the selected category from categoriesList and add to tags
		Reset the categoriesList and search restaurant if necessary
    */
    addCategoryToTags(index){

    	let category: Category = this.categoriesList[index];

    	if(category != null){
    		this.selectedCategory = category;
    	}

    	this.categoriesList.length = 0;
    	this.keySearchCategory = category.categoryName;

    	this.checkSearchRestaurantsByCityAndCategories();

    }

    /*
		Get the selected city from cityList and add to tags
		Reset the cityList and search restaurant if necessary
    */
    addCityToTags(index){

    	let city: City = this.cityList[index];

    	if(city != null){
    		this.selectedCity = city;
    	}

    	this.cityList.length = 0;
    	this.keySearchCity = this.selectedCity.cityName;

    	this.checkSearchRestaurantsByCityAndCategories();

    }

	/*
		Search cities by name:
		1. Reset cityList and categoriesList
		2. Call to CityProvider for getting the cityList by name
	*/
	searchCities(){

		this.cityList.length = 0;
		this.categoriesList.length = 0;
		this.restaurantsCategoriesList.length = 0;

		if(this.keySearchCity != null && this.keySearchCity.length < 4){
			return;
		}

		this.isLoading = true;
    	this.selectedCity.cityId = 0;
    	this.selectedCity.cityName = "";

    	this.cityProvider.findByName(this.keySearchCity).then(
    		(data) => {
    			let city = new City();
    			this.cityList = city.buildFromList(data);
    			this.isLoading = false;
    		},
    		(err) => {
    			this.cityList.length = 0;
    			this.isLoading = false;
    		}
    	);

	}

	/*
		Reset the category search always on enter in the segment
	*/
	resetCategorySearch(){

		this.selectedCity = new City();
		this.selectedCategory = new Category();

		this.restaurantsCategoriesList.length = 0;
		this.cityList.length = 0;
		this.categoriesList.length = 0;

		this.keySearchCategory = "";
		this.keySearchCity = "";

	}

}
