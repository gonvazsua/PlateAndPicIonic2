import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as Constants from '../../constants/API';


@Injectable()
export class PlatePictureProvider {

  	constructor(public http: Http, public storage: Storage) {
    
  	}

  	/*
		Return promise a PlatePicture list of the user passed as parameter
  	*/
  	getPlatePicturesByUser(user, page){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let params: URLSearchParams = new URLSearchParams();
	  				let requestOptions = new RequestOptions();
	  				let headers = new Headers();

			  		headers.append('Authorization', token);
			  		params.set('username', user.username);
			  		params.set('page', page);
		
			  		requestOptions.headers = headers;
	  				requestOptions.params = params;

			  		this.http.get(Constants.GET_PLATEPICTURES_BY_USERNAME, requestOptions).subscribe(
			  			res => {
			  				alert(res);
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
