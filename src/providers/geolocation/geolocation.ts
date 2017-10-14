import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GeolocationProvider {

  	constructor(public geolocation: Geolocation) {
    
  	}

  	getLocation(){

  		return new Promise((resolve, reject) => {

  			this.geolocation.getCurrentPosition().then((resp) => {
		
  				resolve(resp.coords);

			}).catch((error) => {
			  	reject("Ha habido un problema al obtener la localizacion");
			});

  		});

  	}

}
