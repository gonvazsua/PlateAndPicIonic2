import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PictureServiceProvider } from '../../providers/picture-service/picture-service';

@IonicPage()
@Component({
  selector: 'page-change-profile-picture',
  templateUrl: 'change-profile-picture.html',
})
export class ChangeProfilePicturePage {

	  private base64Image: string;

  	constructor(
  		private pictureService: PictureServiceProvider,
  		public navCtrl: NavController, 
  		public navParams: NavParams) {

  		this.base64Image = "";

  	}

	  ionViewDidLoad() {
	      console.log('ionViewDidLoad ChangeProfilePicturePage');
        this.openActionSheetAndGetImage();
	  }

  	openActionSheetAndGetImage(){

  		this.pictureService.getImageByActionSheet().then(

        (image) => {
          this.setImage(image);
        },
        (err) => {

        }

      );

  	}

    setImage(image){
      this.base64Image = image;
    }

}
