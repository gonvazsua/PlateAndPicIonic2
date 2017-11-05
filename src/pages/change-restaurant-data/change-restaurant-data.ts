import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-change-restaurant-data',
  templateUrl: 'change-restaurant-data.html',
})
export class ChangeRestaurantDataPage {

	private restaurant: Restaurant;
	private restaurantId: number;

  	constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams,
  		private restaurantProvider: RestaurantProvider,
  		private alertProvider: AlertProvider) {
  	
  		this.restaurant = null;
  		this.restaurantId = navParams.get("restaurantId");

  	}

  	/*
		Load the restaurant by Id
  	*/
  	ionViewDidEnter() {
    	
    	if(this.restaurantId != null && this.restaurantId > 0){
    		this.loadRestaurant();
    	}
    	else{
    		this.navCtrl.pop();
    	}

  	}

  	/*
		Load the restaurant data by restaurantId
  	*/
  	loadRestaurant(){

  		this.restaurantProvider.getRestaurantById(this.restaurantId).then(

  			(data) => {

  				this.restaurant = new Restaurant();
  				this.restaurant.build(data);

  			},
  			(err) => {
  				this.alertProvider.show("¡Ups!", err);
  			}

  		);

  	}



}
