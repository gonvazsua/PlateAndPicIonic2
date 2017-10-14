import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constants from '../../constants/API';
import { Restaurant } from '../../models/restaurant';
import { ApiPlace } from '../../models/api-place';

@Injectable()
export class ApiPlacesProvider {

  	constructor(public http: Http) {
    
  	}

  	findPlaces(lat, long, name){

  		return new Promise((resolve, reject) => {

  			let data = null;
	  		let params: URLSearchParams;
			let requestOptions = new RequestOptions();

			params = this.getParams(lat, long, name);
			requestOptions.params = params;

	  		this.http.get(Constants.GET_API_PLACES_ENDPOINT, requestOptions).subscribe(
	  			res => {
	  				
	  				data = res.json();

	  				//saveRestaurantsApiPlaces(data);

	  				resolve(this.buildRestaurantsFromApiPlace(data));

	  			},
	  			(err) => {
	  				data = err.json();
	  			}
	  		);

  		});

  	}

  	/*
		Create a URLSearchParams dinamically with location, name and the api key
  	*/
  	private getParams(lat, long, name): URLSearchParams {

  		let params: URLSearchParams = new URLSearchParams();

  		if(lat && long){
  			params.set("location", lat + "," + long);
  		}

  		if(name){
  			params.set("name", name);	
  		}

  		params.set("key", Constants.GET_API_KEY);

  		return params;

  	}

  	private buildRestaurantsFromApiPlace(data): Array<Restaurant>{

  		let restaurants: Array<Restaurant>;
  		let apiPlace: ApiPlace = new ApiPlace(null, null, null, null, null, null);

  		for(let place of data){

  			apiPlace.build(place);
  			

  		}

  		return restaurants;

  	}


}
