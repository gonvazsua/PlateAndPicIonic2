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
		Find a Restaurants list with the name passed as parameter
  	*/
  	findRestaurantsByName(name, latitude, longitude){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let params: URLSearchParams = new URLSearchParams();
	  				let requestOptions = new RequestOptions();
	  				let headers = new Headers();

			  		headers.append('Authorization', token);
			  		params.set('name', name);
			  		params.set('latitude', latitude);
			  		params.set('longitude', longitude);
		
			  		requestOptions.headers = headers;
	  				requestOptions.params = params;

			  		this.http.get(Constants.GET_RESTAURANT_BY_NAME, requestOptions).subscribe(
			  			res => {

			  				let data = res.json();
			  				
			  				if(data.length > 0)
			  					resolve(res.json());
			  				else
			  					resolve(null);

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
		Save the restaurant passed as parameter
  	*/
  	saveRestaurant(restaurant){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let headers = new Headers();
		  			headers.append('Content-Type', 'application/json');
		  			headers.append('Authorization', token);

		  			this.http.post(Constants.SAVE_RESTAURANT, JSON.stringify(restaurant), {headers: headers})
		  				.subscribe(
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
		Return a Restaurant list with the city and categories passed as parameter
  	*/
  	findRestaurantsByCityAndCategory(cityId, categoryId){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let params: URLSearchParams = new URLSearchParams();
	  				let requestOptions = new RequestOptions();
	  				let headers = new Headers();

			  		headers.append('Authorization', token);
			  		params.set('cityId', cityId);
			  		params.set('categoryId', categoryId);
		
			  		requestOptions.headers = headers;
	  				requestOptions.params = params;

			  		this.http.get(Constants.FIND_RESTAURANTS_BY_CITY_AND_CATEGORY, requestOptions).subscribe(
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
		Return the Restaurant of the logged user
  	*/
  	getUserRestaurant(){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let params: URLSearchParams = new URLSearchParams();
	  				let requestOptions = new RequestOptions();
	  				let headers = new Headers();

			  		headers.append('Authorization', token);
		
			  		requestOptions.headers = headers;
	  				requestOptions.params = params;

			  		this.http.get(Constants.GET_USER_RESTAURANT, requestOptions).subscribe(
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

}
