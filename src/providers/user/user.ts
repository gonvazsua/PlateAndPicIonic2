import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import * as Constants from '../../constants/API';

@Injectable()
export class UserProvider {

	private user: User;
	private token: string;

  	constructor(public http: Http, public storage: Storage) {

    	this.user = new User(null, null, null, null, null, null, null);
    	this.token = "";

  	}


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
			  				reject(err);
			  			}
			  		);
	  			},
	  			(err) => {
	  				return null;
	  			}
  			);

  		});

  	}

}
