import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as Constants from '../../constants/API';

@Injectable()
export class AuthenticationProvider {

	public token: any;

  	constructor(
  		public http: Http,
  		public storage: Storage) {
    	
  	}

  	checkAuthentication(){

  		return new Promise((resolve, reject) => {

  			this.storage.get('userData').then(

  				(data) => {

	  				let headers = new Headers();
	  				headers.append('Content-Type', 'application/json');

	  				this.http.post(Constants.LOGIN_URL, JSON.stringify(data), {headers: headers})
		  				.subscribe(
		  					res => {

		  						let response = this.saveToken(res);
		  						this.updateUserDataStorage(data, true);
		  						resolve(response);

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

  	register(){

  	}

  	login(data, keepConnected){

  		return new Promise((resolve, reject) => {

  			let headers = new Headers();
  			headers.append('Content-Type', 'application/json');

  			this.http.post(Constants.LOGIN_URL, JSON.stringify(data), {headers: headers})
  				.subscribe(
  					res => {

  						let response = this.saveToken(res);
  						this.updateUserDataStorage(data, keepConnected);
  						resolve(response);

  					},
  					(err) => {
              reject(err._body);
  					}
  				);
  		});

  	}

  	logout(){
  		
  		return new Promise((resolve, reject) => {
  			
  			this.storage.remove('userData').then(
  				(success) => {
  					resolve(true);
  				},
  				(err) => {
  					reject(false);
  				}
  			);

  		});
  	}

  	saveToken(res){
  		let response = res.json();
		  this.token = response.token;
		  this.storage.set('token', this.token);
		  return response;
  	}

  	updateUserDataStorage(data, keepConnected){

  		if(keepConnected)
  			this.storage.set('userData', data);
  		else
  			this.storage.remove('userData');

  	}

}
