import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PictureServiceProvider } from '../../providers/picture-service/picture-service';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';
import { AlertProvider } from '../../providers/alert/alert';
import { UploadImageProvider } from '../../providers/upload-image/upload-image';

@IonicPage()
@Component({
  selector: 'page-change-profile-picture',
  templateUrl: 'change-profile-picture.html',
})
export class ChangeProfilePicturePage {

	  private base64Image: string;
    private user: User;
    private pendingToSave: boolean;

  	constructor(
  		private pictureService: PictureServiceProvider,
  		public navCtrl: NavController, 
  		public navParams: NavParams,
      public userProvider: UserProvider,
      public alertProvider: AlertProvider,
      public uploadImageProvider: UploadImageProvider) {

  		this.base64Image = null;
      this.user = new User();
      this.pendingToSave = false;

  	}

    /*
      Get the profile image of userLogged
        1. Load logged user
        2. Set base64Image to the current userPhoto
    */
    ionViewDidLoad() {

        this.loadUserLogged();

    }

    /*
      Load logged user and set the current image to base64Image
    */
    loadUserLogged(){

        this.userProvider.getLoggedUser().then(

          (data) => {

              this.user.build(data);

              this.setImage(this.user.picture);

          },
          (err) => {
              this.alertProvider.show('¡Ups!', err);
              this.setImage(null);
          }

        );

    }

    /*
      Call to a PictureServiceProvider to get the image, and save it
    */
  	openActionSheetAndGetImage(){

  		this.pictureService.getImageByActionSheet().then(

        (image) => {

          console.log(image);
          this.setImage(image);
          this.pendingToSave = true;

        },
        (err) => {
          this.alertProvider.show('¡Ups!', "Ha habido un problema al obtener la imagen");
          this.setImage(null);
          this.pendingToSave = false;
        }

      );

  	}

    /*
      Set the image to the global image
    */
    setImage(image){
      this.base64Image = image;
    }

    /*
      Upload and save the base64Image
    */
    saveImage(){

        this.uploadImageProvider.uploadProfilePicture(this.base64Image).then(

          (data) => {

              this.alertProvider.show('¡Bien!', "Hemos actualizado tu imagen");              
              this.pendingToSave = false;

          },
          (err) => {

              this.alertProvider.show('¡Ups!', "Ha habido un problema al guardar la imagen");
              this.setImage(null);
              this.pendingToSave = false;

          }

        );

    }

    /*
      Discard new image, setting to user picture if exists, or setting to null if not
    */
    discardImage(){

        if(this.user.picture == null){

          this.base64Image = null;

        } else {

          this.base64Image = this.user.picture;

        }

        this.pendingToSave = false;

    }
}
