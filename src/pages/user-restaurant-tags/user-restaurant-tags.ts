import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import { Restaurant } from '../../models/restaurant';
import * as Constants from '../../constants/API';
import { LoadingProvider } from '../../providers/loading/loading';
import { Category } from '../../models/category';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-user-restaurant-tags',
  templateUrl: 'user-restaurant-tags.html',
})
export class UserRestaurantTagsPage {

	private restaurantId: number;
	private restaurantName: string;
	private restaurantCategories: Array<Category>;
	private noSelectedCategories: Array<Category>;

  	constructor(public navCtrl: NavController, public navParams: NavParams,
  		public httpProvider: HttpProvider, public storage: Storage,
  		public loading: LoadingProvider, public alert: AlertProvider) {
  		
  		this.restaurantId = null;
  		this.restaurantName = null;
  		this.restaurantCategories = [];
  		this.noSelectedCategories = [];

  	}

  	/*
		Load the restaurant from Storage, and the Tags	
  	*/
  	ionViewDidEnter() {

  		this.loadRestaurantFromStorageAndCategories();

  		this.loadNoSelectedCategories();
    
  	}

  	/*
		Load the restaurant data from Storage and their categories by restaurantId
  	*/
  	loadRestaurantFromStorageAndCategories() {

  		this.storage.get("restaurantId").then(
  			(data) => {
  				this.restaurantId = data;
  				this.loadCategoriesOfUserRestaurant();
  			}
  		);

  		this.storage.get("restaurantName").then(
  			(data) => {
  				this.restaurantName = data;
  			}
  		);

  	}

  	/*
		Load categories of the user restaurant
  	*/
  	loadCategoriesOfUserRestaurant() {

  		this.loading.show();

  		this.httpProvider.get(Constants.GET_USER_RESTAURANT_CATEGORIES, null).then(

  			(data) => {
  				
  				let category = new Category();

  				this.restaurantCategories = category.buildFromList(data);

  				this.loading.hide();

  			},
  			(err) => {
  				this.loading.hide();
  				console.log("Error loading restaurant: " + err);
  				this.navCtrl.pop();
  			}

  		);

  	}

  	/*
		Load the tags that the restaurant have not loaded
  	*/
  	loadNoSelectedCategories() {

  		this.loading.show();

  		this.httpProvider.get(Constants.GET_NO_USER_RESTAURANT_CATEGORIES, null).then(

  			(data) => {
  				
  				let category = new Category();
  				
  				this.noSelectedCategories = category.buildFromList(data);

  				this.loading.hide();

  			},
  			(err) => {
  				this.loading.hide();
  				console.log("Error loading restaurant: " + err);
  				this.navCtrl.pop();
  			}

  		);

  	}

  	/*
		Add category to selected index:
		1. Get category selected
		2. Save it
		3. Remove from no selected an add to selected categories
  	*/
  	addCategoryToRestaurant(index){

  		let category: Category = this.noSelectedCategories[index];

  		this.httpProvider.post(Constants.ADD_CATEGORY, category).then(

  			(data) => {

  				this.noSelectedCategories.splice(index, 1);
  				this.restaurantCategories.push(category);

  			},
  			(err) => {
  				console.log("Error saving category: " + err);
  				this.alert.show("¡Ups!", err);
  			}

  		);

  	}

  	/*
		Remove category of restaurant:
		1. Get category selected
		2. Remove it
		3. Remove from selected an add to non selected categories
  	*/
  	removeCategoryFromRestaurant(index){

  		let category: Category = this.restaurantCategories[index];

  		this.httpProvider.post(Constants.REMOVE_CATEGORY, category).then(

  			(data) => {

  				this.restaurantCategories.splice(index, 1);
  				this.noSelectedCategories.push(category);

  			},
  			(err) => {
  				console.log("Error saving category: " + err);
  				this.alert.show("¡Ups!", err);
  			}

  		);

  	}

}
