import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PictureServiceProvider {

	public base64Image: any;
	public getImage: any;

  	constructor(
  		private camera: Camera,
  		public actionSheetCtrl: ActionSheetController) {
    	
    	this.base64Image = null;
    	this.getImage = Observable.create(observer => {
        	this.getImage = observer;
    	});
  	}

  	getPicture() {

  		return this.showActionSheet();

  	}

  	showActionSheet() {

	    let actionSheet = this.actionSheetCtrl.create({
	      title: 'Selecciona',
	      buttons: [
	        {
	          text: 'Abrir cámara',
	          handler: () => {
	            return this.takePicture(this.camera.PictureSourceType.CAMERA);
	          }
	        },{
	          text: 'De la galería',
	          handler: () => {
	            return this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
	          }
	        },{
	          text: 'Cancelar',
	          role: 'cancel',
	          handler: () => {
	            console.log('Cancel clicked');
	          }
	        }
	      ]
	    });

	    actionSheet.present();

  	}

  	takePicture(sourceType){

  		var image = "";

  		var options: CameraOptions = {
		  	quality: 100,
    		sourceType: sourceType,
		  	destinationType: this.camera.DestinationType.DATA_URL,
		  	encodingType: this.camera.EncodingType.JPEG,
		  	mediaType: this.camera.MediaType.PICTURE
		}

  		this.camera.getPicture(options).then(

  			(imageData) => {
				image = 'data:image/jpeg;base64,' + imageData;
				this.base64Image.next(image);
			},
			(err) => {
				image = "";
				this.base64Image.next(image);
			}
		);

  	}

  	getBase64Image(){
  		return this.base64Image;
  	}

}
