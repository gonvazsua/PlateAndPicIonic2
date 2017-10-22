import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { AlertProvider } from '../../providers/alert/alert';
import { PlatePictureProvider } from '../../providers/plate-picture/plate-picture';
import { PlatePicture } from '../../models/plate-picture';
import { PlateProvider } from '../../providers/plate/plate';

@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

	private restaurant: Restaurant;
	private restaurantId: number;
  private plateId: number;
	private categories: Array<string>;
  private plateList: Array<Object>;
  private platePictureList: Array<PlatePicture>;
  private page: number;
  private select: string;

	//Segment var
	private segmentOption: string;

	constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams,
  		public restaurantProvider: RestaurantProvider,
  		public alert: AlertProvider,
  		public platePictureProvider: PlatePictureProvider,
      public plateProvider: PlateProvider) {

		  this.restaurant = new Restaurant();
		  this.restaurantId = this.navParams.get("restaurantId");
      this.plateId = this.navParams.get("plateId");
		  this.categories = [];
      this.plateList = [];
      this.platePictureList = [];
      this.page = 0;
		  this.segmentOption = "pictures";
      this.select = "";

  	}

  	/*
		  Always loaded on view start:
      1. Load restaurant
      2. Load platePictures of the restaurant
      3. If param plateId exists: filter by plate
      4. If param plateId does not exist: filter by restaurant;
  	*/
  	ionViewDidLoad() {
    	
  		this.loadRestaurantById();

      this.loadPlatesByRestaurantId();

      if(this.plateId != null && this.plateId > 0){


          this.filterPlatePicturesByPlate(this.plateId);

      } else {

           this.loadPlatePicturesByRestaurantId();
      }

  	}

  	/*
		  Get restaurant with the id passed as parameter
  	*/
  	loadRestaurantById(){

  		this.restaurantProvider.getRestaurantById(this.restaurantId).then(
  			(restaurant) => {
  				
          this.restaurant.build(restaurant);
          this.loadCategoriesList();

  			},
  			(err) => {
  				this.alert.show("¡Ups!", err);
  			}
  		);

  	} 

  	/*
		  Load the plate pictures of the restaurant passed as parameter
  	*/
  	loadPlatePicturesByRestaurantId(){

      this.platePictureProvider.getPlatePicturesByRestaurantId(this.restaurantId, this.page).then(

        (data) => {

          this.appendPlatePictures(data);

          this.incrementPage(data);

        },
        (err) => {

          console.log("Error in loadPlatePicturesByRestaurantId" + err);
          this.alert.show("¡Ups!",err);

        }

      );

  	}

    /*
      Push a platePictureList into lastPlatePictures array
    */
    appendPlatePictures(platePicturesResults){

      for(let platePicture of platePicturesResults){
        this.platePictureList.push(platePicture);
      }

    }

    /*
      Increment the current query page if the length of data is higher than
      the row limit of PlatePictures
    */
    incrementPage(data){

      if(data.length == this.platePictureProvider.getRowLimit()){
        this.page = this.page + 1;
      }

    }

    /*
      Load the plate list of the restaurant passed as parameter
    */
    loadPlatesByRestaurantId(){

      this.plateProvider.getPlatesByRestaurantId(this.restaurantId).then(

        (data) => {
          this.appendPlates(data);
        },
        (err) => {

        }

      );

    }

    /*
      Append the plates result to the plate list
    */
    appendPlates(plates){

      for(let plate of plates){
        this.plateList.push(plate);
      }

    }

    /*
      Filter PlatePictures by plate name
    */
    filterPlatePicturesByPlate(plateId){

      this.page = 0;
      this.platePictureList.length = 0;

      if(plateId == ''){
        return this.loadPlatePicturesByRestaurantId();
      }

      this.platePictureProvider.getPlatePicturesByPlateId(plateId, this.page).then(

        (data) => {

          this.select = plateId;

          this.appendPlatePictures(data);

          this.incrementPage(data);

        },
        (err) => {

          console.log("Error in filterPlatePicturesByPlate" + err);
          this.alert.show("¡Ups!",err);

        }

      );

    }

    /*
      Parse categories separated by comma in a list
    */
    loadCategoriesList(){

      let separator = ',';

      if(this.restaurant.categories && this.restaurant.categories.length > 0){
      
        this.categories = this.restaurant.categories.split(separator);

      }

    }

}
