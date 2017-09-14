import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PictureServiceProvider } from '../../providers/picture-service/picture-service';

@IonicPage()
@Component({
  selector: 'page-change-profile-picture',
  templateUrl: 'change-profile-picture.html',
})
export class ChangeProfilePicturePage {

	base64Image: any;

  	constructor(
  		private pictureService: PictureServiceProvider,
  		public navCtrl: NavController, 
  		public navParams: NavParams) 
  	{
  		this.pictureService.base64Image.subscribe(
  			(image) => {
  				this.base64Image = image;
  			}
  		);
  	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad ChangeProfilePicturePage');
	}

  	openActionSheet(){

  		this.pictureService.getPicture();

  	}

}
