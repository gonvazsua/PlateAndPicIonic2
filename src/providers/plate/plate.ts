import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Plate } from '../../models/plate';
import * as Constants from '../../constants/API';

@Injectable()
export class PlateProvider {

  	constructor(public http: Http, public storage: Storage) {
    	
  	}

  	/*
		  Return promise with a Plate list of the restaurant passed as parameter
  	*/
  	getPlatesByRestaurantId(restaurantId){

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

			  		this.http.get(Constants.GET_PLATES_BY_RESTAURANTID, requestOptions).subscribe(
			  			res => {
			  				let plate: Plate = new Plate();
                resolve(plate.buildFromList(res.json()));
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
      Return promise with a Plate list of the restaurant passed as parameter
    */
    findPlatesByName(name, page){

      return new Promise((resolve, reject) => {

        this.storage.get('token').then(
          (token) => {

            let params: URLSearchParams = new URLSearchParams();
            let requestOptions = new RequestOptions();
            let headers = new Headers();

            headers.append('Authorization', token);
            params.set('name', name);
            params.set('page', page);
    
            requestOptions.headers = headers;
            requestOptions.params = params;

            this.http.get(Constants.GET_PLATES_BY_NAME, requestOptions).subscribe(
              res => {
                let plate: Plate = new Plate();
                resolve(plate.buildFromList(res.json()));
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
