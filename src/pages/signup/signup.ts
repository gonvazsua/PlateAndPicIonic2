import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AlertController } from 'ionic-angular';
import { SearchRestaurantPage } from '../search-restaurant/search-restaurant';
import { ModalController } from 'ionic-angular';
import { Restaurant } from '../../models/restaurant';
import { UserProvider } from '../../providers/user/user';

/*
  1. Complete sign up form
  2. Save user
  3. If the user is a restaurant:
  4.    Show modal SearchRestaurantPage to select the restaurant to manage.
  5.    Send an email to administrators to validate this user <-> restaurant
  6. Else: Go to Home (TabsPage)
*/
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	private signUpForm: FormGroup;
  private showRegisterErrors: boolean;
  private buttonText: string;
  private selectedRestaurant: Restaurant;

  constructor(
  	  public navCtrl: NavController, 
  	  public navParams: NavParams,
  	  public formBuilder: FormBuilder,
      public authenticationProvider: AuthenticationProvider,
      public loading: LoadingProvider,
      public alert: AlertProvider,
      public alertCtrl: AlertController,
      public modalCtrl: ModalController,
      public userProvider: UserProvider) {

      this.showRegisterErrors = false;
      this.buttonText = "He terminado";
      this.selectedRestaurant = null;

  	  this.signUpForm = this.formBuilder.group({
  		  username: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(4)]],
  		  email: ['', [Validators.required, Validators.email, Validators.maxLength(50), Validators.minLength(4)]],
  		  password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
  		  repeatPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), this.equalto('password')]],
        isUserRestaurant: [false, []]
  	  });

  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad SignupPage');
  }

  /*
    Change the text of the button depending on the value of the toogle of restaurants
  */
  updateText(event){

    if(event.checked){
      this.buttonText = "Seleccionar restaurante";
    }
    else{
      this.buttonText = "He terminado";
    }

  }

  /*
    Check if passwords are equals
  */
  equalto(field_name): ValidatorFn {
    
    return (control: AbstractControl): {

      [key: string]: any} => {

        let input = control.value;

        let isValid=control.root.value[field_name]==input
        
        if(!isValid){
          return { 'equalTo': {isValid} }
        } else{
          return null;
      };
    }
  }

  /*
    Check if the form is valid and go to sign up services
  */
  checkValidSignUpForm(){

    this.showRegisterErrors = !this.signUpForm.valid;

    if(!this.showRegisterErrors){

      this.checkUserRestaurantAndSignUp();

    }

  }

  /*
    Check if the toogle of restaurant has been checked, and show the alert.
    Else, go to signUp
  */
  checkUserRestaurantAndSignUp(){

    if(this.signUpForm.get("isUserRestaurant").value == true){

      this.showConfirmAndSignUp();

    } else {

      this.signUp();

    }

  }

  /*
    Show confirm message. If it is acepted, call to signUp form function
  */
  showConfirmAndSignUp(){

    let confirm = this.alertCtrl.create({
      title: 'Sobre los restaurantes....',
      message: 'Al seleccionar que tienes un restaurante te pediremos que selecciones uno, y realizaremos una confirmación de identidad. ¿Quieres continuar?',
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
            this.signUp();

          }
        }
      ]
    });
    
    confirm.present();

  }

  /*
    Call to register service and redirect to:
    - SearchRestaurantPage if the user is a restaurant
    - TabsPage in other way
  */
  signUp(){

    this.loading.show();

  	let formObject = this.signUpForm.getRawValue();

    this.authenticationProvider.register(formObject).then(

      (data) => {

        if(this.signUpForm.get("isUserRestaurant").value == true){

          this.searchRestaurant();
        
        } else {

          this.navCtrl.setRoot(TabsPage);

        }

      },
      (err) => {
        this.loading.hide();
        console.log("There was an error in register service: " + err);
        this.alert.show('¡Ups!', err);
      }

    );

  }

  /*
    Open SearchRestaurant page as a modal.
    Retrieve selected restaurant if exists
  */
  searchRestaurant(){
    
    let modal = this.modalCtrl.create(SearchRestaurantPage);

    modal.onDidDismiss((data) => {

      if(data == null){
        this.alert.show("Alerta","Hemos registrado tu usuario pero no se ha asignado ningun restaurante");
        this.selectedRestaurant = null;
      } else {
        
        this.selectedRestaurant = new Restaurant();
        this.selectedRestaurant.build(data);

        this.saveUserRestaurant();

      }
      
    });

    modal.present();
  
  }

  /*
    Save the selected restaurant for the logged user
  */
  saveUserRestaurant(){

    this.loading.show();

    this.userProvider.saveUserRestaurant(this.selectedRestaurant).then(

      (data) => {

        this.loading.hide();
        this.navCtrl.setRoot(TabsPage);

      },
      (err) => {
        this.loading.hide();
        console.log("Problem saving restaurant for user:" + err);
        this.alert.show("¡ups!", err);
      }

    );

  }

}
