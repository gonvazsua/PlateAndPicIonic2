import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { AlertProvider } from '../../providers/alert/alert';
import { PlatePictureProvider } from '../../providers/plate-picture/plate-picture';

@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

	private restaurant: Restaurant;
	private restaurantId: number;
	private categories: Array<Object>;

	//Segment var
	private segmentOption: string;

	constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams,
  		public restaurantProvider: RestaurantProvider,
  		public alert: AlertProvider,
  		public platePictureProvider: PlatePictureProvider) {

		this.restaurant = new Restaurant(null,null,null,null,null,null,null,null,null, null);
		this.restaurantId = this.navParams.get("restaurantId");
		this.categories = [];

		this.segmentOption = "pictures";

  	}

  	/*
		Always loaded on view start
  	*/
  	ionViewDidLoad() {
    	
  		this.loadRestaurantById();

  		this.loadPlatePicturesByRestaurantId();

  	}

  	/*
		Get restaurant with the id passed as parameter
  	*/
  	loadRestaurantById(){

  		this.restaurantProvider.getRestaurantById(this.restaurantId).then(
  			(restaurant) => {
  				this.restaurant = this.restaurant.build(restaurant);
  			},
  			(err) => {
  				this.alert.show("¡Ups!", err);
  			}
  		);

  	} 

  	/*
		Load the plate pictures of the restaurant passed as parameter
  	*/
  	loadPlatePicturesByRestaurantId(){



  	}

}
