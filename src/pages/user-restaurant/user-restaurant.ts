import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { Restaurant } from '../../models/restaurant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpProvider } from '../../providers/http/http';
import * as Constants from '../../constants/API';
import { UploadImageProvider } from '../../providers/upload-image/upload-image';
import { PictureServiceProvider } from '../../providers/picture-service/picture-service';

@IonicPage()
@Component({
  selector: 'page-user-restaurant',
  templateUrl: 'user-restaurant.html',
})
export class UserRestaurantPage {

	private restaurant: Restaurant;
	private restaurantForm: FormGroup;

  	constructor(
  		public navCtrl: NavController, public navParams: NavParams,
  		private restaurantProvider: RestaurantProvider, private loading: LoadingProvider,
  		private alert: AlertProvider, public formBuilder: FormBuilder, 
  		public httpProvider: HttpProvider, public uploadImageProvider: UploadImageProvider,
  		private pictureService: PictureServiceProvider) {

  		this.restaurant = new Restaurant();

  		this.restaurantForm = this.formBuilder.group({
	  		name: ['', [Validators.required, Validators.maxLength(50)]],
	  		address: ['', [Validators.required, Validators.maxLength(50)]],
	  		phoneNumber: ['', [Validators.maxLength(12)]],
	  		cityName: ['', []],
	  		priceAverage: ['', []],
	  		description: ['', [Validators.maxLength(200)]],
	  		rating: ['', []]
	  	});
  	
  	}

  	/*
		Load restaurant information
  	*/
  	ionViewDidEnter() {
    	
  		this.loadRestaurant();

  	}

  	/*
		Load the restaurant of the logged user 
  	*/
  	loadRestaurant(){

  		this.loading.show();

  		this.httpProvider.get(Constants.GET_USER_RESTAURANT, null).then(

  			(data) => {

  				this.restaurant.build(data);
  				this.loading.hide();

  			}, 
  			(err) => {

  				this.loading.hide();
  				this.alert.show("¡Ups!", err);
  				console.log("There was an error loading restaurant: " + err);

  			}

  		);

  	}

  	/*
		Call to PictureProvider to update the picture of the restaurant
  	*/
  	loadPicture(){

  		this.pictureService.getImageByActionSheet().then(

	        (image) => {

	        	this.setPicture(image);
	          	this.savePicture();

	        },
	        (err) => {
	          console.log(err);
	          this.alert.show('¡Ups!', "Ha habido un problema al obtener la imagen");
	        }

	    );

  	}

  	/*
      Set the image to the global image
    */
    setPicture(image){
      this.restaurant.picture = image;
    }

  	/*
      Upload and save the base64Image
    */
    savePicture(){

        this.uploadImageProvider.uploadRestaurantPicture(this.restaurant.picture).then(

          (data) => {

              this.navCtrl.pop();

          },
          (err) => {

              this.alert.show('¡Ups!', "Ha habido un problema al guardar la imagen");
              this.setPicture(null);

          }

        );

    }

  	/*
		Parse restaurant and save form
  	*/
  	saveRestaurantForm(){

  		this.restaurant.address = this.restaurantForm.get("address").value;
  		this.restaurant.phoneNumber = this.restaurantForm.get("phoneNumber").value;
  		this.restaurant.priceAverage = this.restaurantForm.get("priceAverage").value;
  		this.restaurant.description = this.restaurantForm.get("description").value;

  		this.saveRestaurant();

  	}

  	/*
		Save restaurant
  	*/
  	saveRestaurant(){

  		this.loading.show();

  		this.httpProvider.post(Constants.UPDATE_RESTAURANT, this.restaurant).then(

  			(data) => {

  				this.loading.hide();
  				this.navCtrl.pop();

  			},
  			(err) => {
  				this.loading.hide();
  				this.alert.show("¡Ups!", err);
  				console.log("Problem saving restaurant: " + err);
  			}

  		);

  	}

}
