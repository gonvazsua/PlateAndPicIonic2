import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class HttpProvider {

  	constructor(public http: Http, public storage: Storage) {
    	
  	}

  	/*
		Make a simple HTTP GET request to the url and parameters passed as parameter
  	*/
  	get(url, parameters){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let params = null;
	  				let requestOptions = new RequestOptions();
	  				let headers = new Headers();

			  		headers.append('Authorization', token); 
			  		requestOptions.headers = headers;

	  				if(parameters != null){

	  					params = this.setParameters(parameters);
	  					requestOptions.params = params;

	  				}

			  		this.http.get(url, requestOptions).subscribe(
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
		Return new URLSearchParams with parameters passed as parameter
  	*/
  	setParameters(parameters): URLSearchParams {

  		let params: URLSearchParams = new URLSearchParams(JSON.stringify(parameters));

  		return params;

  	}

  	/*
		Execute a HTTP POST request to the url, passing the object
  	*/
  	post(url, object){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let headers = new Headers();
		  			headers.append('Content-Type', 'application/json');
		  			headers.append('Authorization', token);

		  			this.http.post(url, JSON.stringify(object), {headers: headers})
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

}
