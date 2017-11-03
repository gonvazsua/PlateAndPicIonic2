import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlatePicture } from '../../models/plate-picture';
import { AlertProvider } from '../../providers/alert/alert';
import { PictureServiceProvider } from '../../providers/picture-service/picture-service';
import { HomePage } from '../home/home';
import { SearchRestaurantPage } from '../../pages/search-restaurant/search-restaurant';
import { ModalController } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant';
import { Plate } from '../../models/plate';
import { SearchPlatePage } from '../../pages/search-plate/search-plate';
import { UploadImageProvider } from '../../providers/upload-image/upload-image';
import { LoadingProvider } from '../../providers/loading/loading';

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

	  private picture: string;
	  private platePicture: PlatePicture;
    private selectedRestaurant: Restaurant;
    private selectedPlate: Plate;
    private title: string;

  	constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private pictureService: PictureServiceProvider,
      public alertProvider: AlertProvider,
      public modalCtrl: ModalController,
      public uploadImageProvider: UploadImageProvider,
      public loadingProvider: LoadingProvider) {
  		
  		this.picture = null;
      this.selectedRestaurant = null;
      this.platePicture = new PlatePicture();
      this.selectedPlate = null;
      this.title = null;

  	}

  	/*
		  Always executed when view is ready
      Take a picture if it is null
  	*/
  	ionViewDidEnter() {
    	
      if(this.picture == null){
        this.takePicture();
      }

  	}

    /*
      Take a picture if already does not exist
    */
    takePicture(){

      this.pictureService.getImageByActionSheet().then(

        (image) => {

          console.log(image);
          this.setImage(image);

        },
        (err) => {
          this.checkPictureError(err);
        }

      );

    }

    /*
      If error is not null, show the error message
      If picture is null, it means that picture has never been selected,
      so redirect to home page
    */
    checkPictureError(error){

      if(error != null){
        this.alertProvider.show('¡Ups!', "Ha habido un problema al obtener la imagen");
      }
          
      if(this.picture == null){
        this.redirectToHome();
      }   

    }

    /*
      Redirect to Home Page
    */
    redirectToHome(){
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    }

    /*
      Set the image to the global image
    */
    setImage(image){
      this.picture = image;
    }

    /*
      Open SearchRestaurant page as a modal.
      Retrieve selected restaurant if exists
    */
    searchRestaurant(){
      
      let modal = this.modalCtrl.create(SearchRestaurantPage);

      modal.onDidDismiss((data) => {

        if(data == null){
          this.selectedRestaurant = null;
        } else {
          
          this.selectedRestaurant = new Restaurant();
          this.selectedRestaurant.build(data);

        }
        
      });

      modal.present();
    
    }

    /*
      Open the SearchPlate page as a modal
      Retrieve the selected plate if exists
    */
    searchPlates(){

      let modal = this.modalCtrl.create(SearchPlatePage,
        {restaurantId: this.selectedRestaurant.restaurantId});

      modal.onDidDismiss((data) => {

        if(data == null){
          this.selectedPlate = null;
        } else {
          
          this.selectedPlate = new Plate();
          this.selectedPlate.build(data);

        }
        
      });

      modal.present();

    }

    /*
      Build and save the platePicture object:
      1. Set the picture
      3. Set the plateId
      4. Set the title
      5. Save
    */
    buildAndSavePlatePicture(){

      this.platePicture = new PlatePicture();
      this.platePicture.picture = this.picture;
      this.platePicture.plateId = this.selectedPlate.plateId;
      this.platePicture.title = this.title;

      this.savePlatePicture();

    }

    /*
      Save the platePicture and redirect to HomePage
      If the operation is success, redirect to HomePage.
      Else, check picture error and show
    */
    savePlatePicture(){

      this.loadingProvider.show();

      this.uploadImageProvider.uploadPlatePicture(this.platePicture).then(

        (data) => {

          this.redirectToHome();

        },
        (err) => {

          this.checkPictureError(err);

        }

      );
      
    }

}
