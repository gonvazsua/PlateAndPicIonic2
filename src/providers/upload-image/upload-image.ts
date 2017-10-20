import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import * as Constants from '../../constants/API';


@Injectable()
export class UploadImageProvider {

	private fileTransfer: FileTransferObject;

  	constructor(public http: Http, private transfer: FileTransfer, public storage: Storage) {

  		this.fileTransfer = this.transfer.create();
    
  	}

  	/*
		Upload the Plate Picture calling to the correspondant API endpoint
  	*/
  	uploadPlatePictureImage(base64Image){

  		let endpoint = Constants.UPLOAD_PLATE_PICTURE;

  		return this.upload(base64Image, endpoint);

  	}

  	/*
		Upload the Profile Picture calling to the correspondant API endpoint
  	*/
  	uploadProfilePicture(base64Image){

  		let endpoint = Constants.UPDATE_PROFILE_PICTURE;

  		console.log(endpoint);

  		return this.upload(base64Image, endpoint);

  	}

  	/*
		Upload a base64Image to the endpoint passed as parameter
  	*/
  	upload(base64Image, endpoint){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(data) => {

	  				let token = data;

		  			let options: FileUploadOptions = {
		     			fileKey: 'image',
		     			fileName: 'image',
		     			mimeType: "image/jpg",
		     			chunkedMode: false,
		     			headers: {'Authorization': token},
		     			params: {'image': base64Image}
		  			}

		  			console.log("Calling to endpoint to upload image");

		  			this.fileTransfer.upload(base64Image, endpoint, options).then(

		  				(data) => {
		  					console.log("Image saved");
					    	resolve(data.response);
					   	},
					   	(err) => {
					   		console.log(err.json());
					    	reject(err._body);
					   	}
					)
				},
				(err) => {
	  				reject("Ha ocurrido un problema");
	  			}
  			);

  		});

  	}

}
