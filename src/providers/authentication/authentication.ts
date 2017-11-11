import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as Constants from '../../constants/API';

@Injectable()
export class AuthenticationProvider {

	  public token: any;
    public restaurantId: any;

  	constructor(
  		public http: Http,
  		public storage: Storage) {
    	
  	}

    /*
      Check if storaged data (username and password) are valid
    */
  	checkAuthentication(){

  		return new Promise((resolve, reject) => {

  			this.storage.get('userData').then(

  				(data) => {

	  				let headers = new Headers();
	  				headers.append('Content-Type', 'application/json');

	  				this.http.post(Constants.LOGIN_URL, JSON.stringify(data), {headers: headers})
		  				.subscribe(
		  					res => {

		  						let response = this.saveTokenAndRestaurantId(res);
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

    /*
      Register new user and save local storage
    */
  	register(form){

      return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(Constants.SIGNUP_URL, JSON.stringify(form), {headers: headers})
          .subscribe(
            res => {

              let response = this.saveTokenAndRestaurantId(res);

              let data = {
                'username': form.username,
                'password': form.password
              };

              this.updateUserDataStorage(data, true);
              resolve(response);

            },
            (err) => {
              reject(err._body);
            }
          );
      });

  	}

    /*
      Call to login service and store the user data in the local storage
    */
  	login(data, keepConnected){

  		return new Promise((resolve, reject) => {

  			let headers = new Headers();
  			headers.append('Content-Type', 'application/json');

  			this.http.post(Constants.LOGIN_URL, JSON.stringify(data), {headers: headers})
  				.subscribe(
  					res => {

  						let response = this.saveTokenAndRestaurantId(res);
  						this.updateUserDataStorage(data, keepConnected);
  						resolve(response);

  					},
  					(err) => {
              reject(err._body);
  					}
  				);
  		});

  	}

    /*
      Logout: Remove storaged user data
    */
  	logout(){
  		
  		return new Promise((resolve, reject) => {
  			
  			this.storage.remove('userData').then(
  				(success) => {

            this.storage.clear();
            console.log("logged out correctly");
  					resolve(true);

  				},
  				(err) => {
            console.log("Problem logging out: " + err);
  					reject(false);
  				}
  			);

  		});
  	}

    /*
      Update storaged token from authentication response
    */
  	saveTokenAndRestaurantId(res){
  		
      let response = res.json();
		  
      this.token = response.token;
		  this.restaurantId = response.restaurantId;

      this.storage.set('token', this.token);
      this.storage.set('restaurantId', this.restaurantId);
		  
      return response;

  	}

    /*
      Update profile data Storage depending if check "Keep connected has been checked"
      data = {username, password}
    */
  	updateUserDataStorage(data, keepConnected){

  		if(keepConnected)
  			this.storage.set('userData', data);
  		else
  			this.storage.remove('userData');

  	}

}
