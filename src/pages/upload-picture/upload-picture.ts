import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlatePicture } from '../../models/plate-picture';

/**
 * Upload process:
 	1. Take picture
 	2. Get location and search restaurant by name
 	3. Select a restaurant:
 	4. 	If restaurant already exists, load plate list
 	5. 	If restaurant does not exist, save it
	6. If plate does not exists in restaurant, enable input text for saving it
	7. Save proccess:
	8. 	If plate is new:
	9.		Save it
	10.	Put the plate into the platePicture object
	11. Save platePicture object

 */

@IonicPage()
@Component({
  selector: 'page-upload-picture',
  templateUrl: 'upload-picture.html',
})
export class UploadPicturePage {

	private restaurantId: number;
	private picture: string;
	private platePicture: PlatePicture;

  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		
  		this.restaurantId = this.navParams.get("restaurantId");
  		this.picture = "";

  	}

  	/*
		Always executed when view is ready
  	*/
  	ionViewDidEnter() {
    	
  		

  	}

}
