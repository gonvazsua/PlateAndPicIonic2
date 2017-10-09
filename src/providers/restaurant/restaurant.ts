import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as Constants from '../../constants/API';
import { Restaurant } from '../../models/restaurant';


@Injectable()
export class RestaurantProvider {

	constructor(public http: Http, public storage: Storage) {
    
  	}

  	/*
		Get a Restaurant object with the ID passed as parameter
  	*/
  	getRestaurantById(restaurantId){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let params: URLSearchParams = new URLSearchParams();
	  				let requestOptions = new RequestOptions();
	  				let headers = new Headers();

			  		headers.append('Authorization', token);
			  		params.set('restaurantId', restaurantId);
		
			  		requestOptions.headers = headers;
	  				requestOptions.params = params;

			  		this.http.get(Constants.GET_RESTAURANT_BY_ID, requestOptions).subscribe(
			  			res => {
			  				resolve(res.json());
			  			},
			  			(err) => {
			  				reject(err._body);
			  			}
			  		);
	  			},
	  			(err) => {
	  				reject("Ha ocurrido un problema");
	  			}
  			);

  		});

  	}

  	/*
		Build Restaurant object from json response
  	*/
  	buildRestaurant(data): Restaurant{

  		let restaurant = new Restaurant(data.restaurantId, data.name, data.address, data.phoneNumber,
				data.registeredOn, data.cityId, data.cityName, data.priceAverage, data.picture,
				data.description, data.active);

  		return restaurant;

  	}

}
