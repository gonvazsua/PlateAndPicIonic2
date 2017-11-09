import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as Constants from '../../constants/API';
import { Follows } from '../../models/follows';

@Injectable()
export class FollowsProvider {

  	constructor(public http: Http, private storage: Storage) {
    	
  	}

  	/*
		Return the Followers object from the userId passed as parameter
  	*/
  	loadByUserId(userId){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let params: URLSearchParams = new URLSearchParams();
	  				let requestOptions = new RequestOptions();
	  				let headers = new Headers();

			  		headers.append('Authorization', token);
			  		params.set('userId', userId);
		
			  		requestOptions.headers = headers;
	  				requestOptions.params = params;

			  		this.http.get(Constants.GET_FOLLOWERS_BY_USER_ID, requestOptions).subscribe(
			  			res => {
			  				
			  				let follows = new Follows();
			  				follows.build(res.json());
			  				resolve(follows);

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
		Follow the loggedUser to the userId passed as parameter
  	*/
  	follow(followInformation){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let headers = new Headers();
		  			headers.append('Content-Type', 'application/json');
		  			headers.append('Authorization', token);

		  			this.http.post(Constants.FOLLOW_TO_USER_ID, JSON.stringify(followInformation), 
		  				{headers: headers}).subscribe(

		  					res => {
		  						resolve();
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
		Unfollow the loggedUser to the userId passed as parameter
  	*/
  	unfollow(followInformation){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let headers = new Headers();
		  			headers.append('Content-Type', 'application/json');
		  			headers.append('Authorization', token);

		  			this.http.post(Constants.UNFOLLOW_TO_USER_ID, followInformation, 
		  				{headers: headers}).subscribe(
		  					res => {

		  						resolve();

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
