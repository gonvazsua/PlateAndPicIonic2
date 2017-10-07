import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as Constants from '../../constants/API';
import { PlatePicture } from '../../models/plate-picture';


@Injectable()
export class PlatePictureProvider {

  	constructor(public http: Http, public storage: Storage) {
    
  	}

  	/*
		Return promise with a PlatePicture list of the user passed as parameter
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
			  				resolve(this.buildPlatePictureList(res.json()));
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
      Build platePicture list from response in json
    */
    buildPlatePictureList(jsonList): Array<PlatePicture>{

      let platePictureList: Array<PlatePicture>;
      let platePicture: PlatePicture;

      platePictureList = [];
      
      for(let pp of jsonList){

      	platePicture = new PlatePicture(
      		pp.platePictureId, pp.title, pp.userId, pp.username,
			pp.userImage, pp.restaurantId, pp.restaurantName, pp.cityId,
			pp.cityName, pp.plateId, pp.plateName, pp.picture,
			pp.likesNumber, pp.commentsNumber, pp.likeToUser, 
			pp.registeredOn
      	);

      	platePictureList.push(platePicture);

      }

      return platePictureList;

    }

    /*
		Return promise with last PlatePictures of the user
  	*/
  	getLastPlatePictures(page){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let params: URLSearchParams = new URLSearchParams();
	  				let requestOptions = new RequestOptions();
	  				let headers = new Headers();

			  		headers.append('Authorization', token);
			  		params.set('page', page);
		
			  		requestOptions.headers = headers;
	  				requestOptions.params = params;

			  		this.http.get(Constants.GET_LAST_PLATEPICTURES, requestOptions).subscribe(
			  			res => {
			  				resolve(this.buildPlatePictureList(res.json()));
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