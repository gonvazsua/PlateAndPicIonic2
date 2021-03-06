import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Plate } from '../../models/plate';
import { PlateProvider } from '../../providers/plate/plate';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-search-plate',
  templateUrl: 'search-plate.html',
})
export class SearchPlatePage {

	private keySearch: string;
	private restaurantId: number;
	private plateList: Array<Plate>;
	private blockedSearch: boolean;
	private isNewPlate: boolean;
	private selectedPlate: Plate;
	private newPlateName: string;
  private selectedIndexPlate: number;

  	constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams,
  		private plateProvider: PlateProvider,
  		private alertProider: AlertProvider,
  		private viewCtrl: ViewController) {

  		this.keySearch = null;
  		this.restaurantId = this.navParams.get("restaurantId");
  		this.plateList = [];
  		this.blockedSearch = false;
  		this.isNewPlate = false;
  		this.selectedPlate = null;
  		this.newPlateName = null;
      this.selectedIndexPlate = null;

  	}

  	/*
		Always executed when view is ready.
		Load the plate list from restaurant
  	*/
  	ionViewDidLoad() {
    	
  		this.blockedSearch = true;

  		this.loadPlatesByRestaurant();

  	}

  	/*
		Load the plate list by restaurantId, if there is some error, set the plate List to null
		and show the plate form for saving the new one
  	*/
  	loadPlatesByRestaurant(){

  		this.plateList = [];

  		this.plateProvider.getPlatesByRestaurantId(this.restaurantId).then(

  			(data) => {

  				let plate = new Plate();
  				this.plateList = plate.buildFromList(data);
  				this.blockedSearch = false;

  				if(this.plateList.length == 0){
  					this.showPlateForm();
  				}

  			},
  			(err) => {
  				this.blockedSearch = false;
  				this.plateList = null;
  				this.showPlateForm();
  			}

  		);

  	}

  	/*
		set the plateList to null for showing the form
  	*/
	showPlateForm(){

		this.clearSelected();

		this.isNewPlate = true;

	}

	/*
      Loop over all elements having the "result" class remove the "selected" one
    */
    clearSelected(){

    	this.selectedPlate = null;

      this.selectedIndexPlate = null;

    }

    /*
    	Check if new plate is marked on
    */
    updateNewPlate(){

    	this.clearSelected();

    	if(this.isNewPlate){
    		this.isNewPlate = false;
    	} else {
    		this.isNewPlate = true;
    	}

    }

    /*
      Select the plate and redirect to upload
    */
    selectPlate(index){

      this.selectedPlate = this.plateList[this.selectedIndexPlate];

      this.isNewPlate = false;

      this.newPlateName = null;

      this.redirectToUploadPage();

    }

	/*
      Save plate if not exists, and redirect to Upload Page
    */
    selectAndGoToUpload(){

    	if(this.isNewPlate){

    		this.saveAndRedirectToUpload();

    	} else {

    		this.redirectToUploadPage();

    	}
    	
    }

    /*
		Save the plate and redirect to upload page
    */
    saveAndRedirectToUpload(){

    	this.selectedPlate = new Plate();
    	this.selectedPlate.restaurantId = this.restaurantId;
    	this.selectedPlate.plateName = this.newPlateName;
      this.selectedPlate.plateActive = true;

    	this.plateProvider.savePlate(this.selectedPlate).then(

    		(plate) => {

    			this.selectedPlate.build(plate);
    			this.redirectToUploadPage();

    		},
    		(err) => {
    			this.alertProider.show("¡Ups!", err);
    		}

    	);

    }

    /*
		Redirect to UploadPage passing the selected plate as parameter
    */
    redirectToUploadPage(){

      	this.viewCtrl.dismiss(this.selectedPlate);

    }

    /*
      Clear the radio buttons selected and set to empty the new plate name
    */
    unselectSelectedPlate(){

      this.selectedPlate = null;
      this.newPlateName = null;

    }


}
