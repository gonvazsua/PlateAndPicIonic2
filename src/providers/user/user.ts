import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import * as Constants from '../../constants/API';

@Injectable()
export class UserProvider {

	private user: User;
	private token: string;

  	constructor(public http: Http, public storage: Storage) {

    	this.user = new User(null, null, null, null, null, null, null, null);
    	this.token = "";

  	}

  	/*
		Return promise with logged user by storaged token
  	*/
  	getLoggedUser(){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(data) => {
	  				this.token = data;
	  				let headers = new Headers();
			  		headers.append('Authorization', this.token);

			  		this.http.get(Constants.GET_AUTHENTICATED_USER_URL, {headers: headers}).subscribe(
			  			res => {
			  				resolve(this.user.build(res.json()));
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
		Update logged user data with user object passed as parameter
  	*/
  	updatePersonalData(user){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(data) => {
	  				this.token = data;
	  				let headers = new Headers();
			  		headers.append('Authorization', this.token);
			  		headers.append('Content-Type', 'application/json');

			  		this.http.post(Constants.UPDATE_PERSONAL_DATA_URL, JSON.stringify(user), {headers: headers})
		  				.subscribe(
		  					res => {

		  						resolve(res);

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
		Update password of logged user by token
  	*/
  	updatePassword(lastPassword, newPassword1, newPassword2){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(data) => {
	  				this.token = data;
	  				let headers = new Headers();
			  		headers.append('Authorization', this.token);
			  		headers.append('Content-Type', 'application/json');

			  		let body = {
			  			'lastPassword': lastPassword,
			  			'newPassword1': newPassword1,
			  			'newPassword2': newPassword2
			  		};

			  		this.http.post(Constants.UPDATE_PASSWORDS_URL, body, {headers: headers})
		  				.subscribe(
		  					res => {

		  						resolve(res);

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
		Return promise with User object loaded by Id
  	*/
  	getUserById(userId){

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

			  		this.http.get(Constants.GET_USER_BY_ID, requestOptions).subscribe(
			  			res => {
			  				resolve(this.user.build(res.json()));
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
