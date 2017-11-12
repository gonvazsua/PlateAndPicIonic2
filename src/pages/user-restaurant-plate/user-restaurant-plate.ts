import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Plate } from '../../models/plate';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import * as Constants from '../../constants/API';
import { PlatePage } from '../../pages/plate/plate';

@IonicPage()
@Component({
  selector: 'page-user-restaurant-plate',
  templateUrl: 'user-restaurant-plate.html',
})
export class UserRestaurantPlatePage {

	private plateList: Array<Plate>;

  	constructor(
  		public navCtrl: NavController, public navParams: NavParams,
  		public httpProvider: HttpProvider, public loading: LoadingProvider,
  		public alert: AlertProvider) {
  	
  		this.plateList = [];

  	}

  	/*
		Load the plate list from the restaurant of the logged user
  	*/
  	ionViewDidEnter() {
    	
  		this.loadPlates();

  	}

  	/*
		Load the plate list
  	*/
  	loadPlates(){

  		this.loading.show();

  		this.httpProvider.get(Constants.GET_PLATES_USER_RESTAURANT, null).then(

  			(data) => {

  				let plate = new Plate();
  				this.plateList = plate.buildFromList(data);
  				this.loading.hide();

  			},
  			(err) => {
  				this.loading.hide();
  				this.alert.show("¡Ups!", err);
  				console.log("There was an error loading the plates: " + err);
  			}

  		);

  	}

  	/*
		Activate/Deactivate plate
  	*/
  	updatePlateActive(index, event){

  		let plate: Plate = this.plateList[index];

  		plate.plateActive = !plate.plateActive;

  		this.httpProvider.post(Constants.SAVE_PLATE, plate).then(

  			(data) => {

  				if(!plate.plateActive){
  				
  					this.alert.show("¡Desactivado!", "Ahora los usuarios no podrán subir fotos de este plato");
  				
  				} else {

  					this.alert.show("¡Activado!", "Ahora los usuarios podrán subir fotos de este plato");

  				}

  			},
  			(err) => {
  				plate.plateActive = !plate.plateActive;
  				console.log("Error updating plate active: " + err);
  			}

  		);

  	}

  	/*
		Go to edit plate page
  	*/
  	goToEditPlate(index){

      let plate: Plate = null

      if(index >= 0){

        plate = this.plateList[index];

      }

  		this.navCtrl.push(PlatePage, {plate: plate});

  	}

}
