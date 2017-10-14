import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant';
import { Plate } from '../../models/plate';
import { User } from '../../models/user';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';

export const SEGMENT_RESTAURANT = "segment_restaurant";
export const SEGMENT_PLATE = "segment_plate";
export const SEGMENT_CATEGORY = "segment_category";
export const SEGMENT_USER = "segment_user";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

	private searchSegment:string;
	private keySearch:string;


	//Results lists
	private restaurantList: Array<Restaurant>;
	private userList: Array<User>;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		
		//Initialize segment to Restaurants
		this.searchSegment = SEGMENT_RESTAURANT;

		this.restaurantList = [];
		this.userList = [];

	}

	/*
		Always executed on view start: Select by restaurant
	*/
	ionViewDidLoad() {
	    
		this.searchRestaurants();

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
	*/
	searchRestaurants(){

	}


}
