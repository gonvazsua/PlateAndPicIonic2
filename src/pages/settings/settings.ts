import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChangeProfilePicturePage } from '../change-profile-picture/change-profile-picture';
import { ChangePasswordPage } from '../change-password/change-password';
import { ChangeProfileDataPage } from '../change-profile-data/change-profile-data';
import { IndexPage } from '../index/index';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { ModalController } from 'ionic-angular';
import { SearchRestaurantPage } from '../search-restaurant/search-restaurant';
import { Restaurant } from '../../models/restaurant';
import { UserProvider } from '../../providers/user/user';
import { LoadingProvider } from '../../providers/loading/loading';
import * as VerificationStatus from '../../constants/verificationStatus';
import { UserRestaurantPage } from '../user-restaurant/user-restaurant';
import { UserRestaurantPlatePage } from '../user-restaurant-plate/user-restaurant-plate';
import { UserRestaurantTagsPage } from '../user-restaurant-tags/user-restaurant-tags';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private isUserRestaurant: boolean;
  private verificationStatusActive: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthenticationProvider,
    public storage: Storage,
    private app: App,
    public alertCtrl: AlertController,
    public alert: AlertProvider,
    public modalCtrl: ModalController,
    public userProvider: UserProvider,
    public loading: LoadingProvider) {
  
    this.isUserRestaurant = false;
    this.verificationStatusActive = false;
  
  }

  ionViewDidEnter() {
    
    this.checkUserRestaurant();

  }

  goToUpdateProfilePicture(){
  	this.navCtrl.push(ChangeProfilePicturePage);
  }

  goToUpdateProfileData(){
  	this.navCtrl.push(ChangeProfileDataPage);
  }

  goToUpdatePassword(){
  	this.navCtrl.push(ChangePasswordPage);
  }

  goToLogout(){
    
    this.authProvider.logout().then(
      (success) => {

        this.app.getRootNav().setRoot(IndexPage);

      },
      (error) => {
        console.log("Error logging out");
      }
    );
  }

  /*
    Check if the user has a restaurant getting the info from the Storage
  */
  checkUserRestaurant(){

    this.storage.get("restaurantId").then(

      (data) => {

        console.log("User restaurantId: " + data);

        if(data != null){
          this.isUserRestaurant = true;
          this.checkVerificationStatus();
        }

      },
      (err) => {

        console.log("Error getting restaurantId: " + err);
        this.isUserRestaurant = false;

      }

    );

  }

  checkVerificationStatus(){

    this.storage.get("verificationStatus").then(

      (data) => {

        console.log("User verificationStatus: " + data);

        if(data != null){
          this.verificationStatusActive = (data == VerificationStatus.ACTIVE);
        }

      },
      (err) => {

        console.log("Error getting restaurantId: " + err);
        this.isUserRestaurant = false;

      }

    );

  }

  /*
    Convert the account in user restaurant
  */
  convertToUserRestaurant(){

    let confirm = this.alertCtrl.create({
      title: 'Sobre los restaurantes....',
      message: 'Al asociar tu cuenta a un restaurante, tendrás que seleccionarlo en el próximo paso. Verificaremos tu identidad para que puedas acceder a la gestión del restaurante.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Restaurant checked has been disagreed');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {

            console.log('Agree restaurant clicked');
            this.searchRestaurant();

          }
        }
      ]
    });
    
    confirm.present();

  }

  /*
    Open SearchRestaurant page as a modal.
    Retrieve selected restaurant if exists
  */
  searchRestaurant(){
    
    let modal = this.modalCtrl.create(SearchRestaurantPage);

    modal.onDidDismiss((data) => {

      if(data == null){

        this.alert.show("Cuidado","No se ha seleccionado ningún restaurante");

      } else {
        
        let selectedRestaurant = new Restaurant();
        selectedRestaurant.build(data);

        this.saveUserRestaurant(selectedRestaurant);

      }
      
    });

    modal.present();
  
  }

  /*
    Save the selected restaurant for the logged user
  */
  saveUserRestaurant(selectedRestaurant){

    this.loading.show();

    this.userProvider.saveUserRestaurant(selectedRestaurant).then(

      (data) => {

        this.loading.hide();
        this.alert.show("¡Bien!", "Hemos guardado tu solicitud. Pronto nos pondremos en contacto contigo");
        this.isUserRestaurant = true;

      },
      (err) => {
        this.loading.hide();
        console.log("Problem saving restaurant for user:" + err);
        this.alert.show("¡ups!", err);
      }

    );

  }

  /*
    Go to the user restaurant page
  */
  manageUserRestaurant(){

    if(!this.verificationStatusActive){
      return null;
    }

    this.navCtrl.push(UserRestaurantPage);

  }

  /*
    Go to manage plates page
  */
  managePlates(){

    this.navCtrl.push(UserRestaurantPlatePage);

  }

  /*
    Go to manage tags page
  */
  manageTags(){

    this.navCtrl.push(UserRestaurantTagsPage);

  }

}
