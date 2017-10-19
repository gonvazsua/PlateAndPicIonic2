import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PictureServiceProvider {

  	constructor(
  		private camera: Camera,
  		public actionSheetCtrl: ActionSheetController) {

  	}

  	getImageByActionSheet() {

  		return new Promise((resolve, reject) => {

  			let actionSheet = this.actionSheetCtrl.create({
			    title: 'Selecciona',
			    buttons: [
			        {
			          text: 'Abrir cámara',
			          handler: () => {
			            resolve(this.takePicture(this.camera.PictureSourceType.CAMERA));
			          }
			        },{
			          text: 'De la galería',
			          handler: () => {
			            resolve(this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY));
			          }
			        },{
			          text: 'Cancelar',
			          role: 'cancel',
			          handler: () => {
			            reject(null);
			          }
			        }
			    ]
			});

			actionSheet.present();

  		});

  	}

  	takePicture(sourceType){

  		return new Promise((resolve, reject) => {

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
					//this.base64Image.next(image);
					resolve(image);
				},
				(err) => {
					image = null;
					reject(image);
					//this.base64Image.next(image);
				}
			);

  		});

  	}

}
