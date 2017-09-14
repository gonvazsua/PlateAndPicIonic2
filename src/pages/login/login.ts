import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	  private loginForm: FormGroup;
    private keepConnected: boolean;
    private showLoginErrors: boolean;
    private showRegisterErrors: boolean;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public formBuilder: FormBuilder,
      public alertCtrl: AlertController,
      public authenticationProvider: AuthenticationProvider,
      public loading: LoadingProvider,
      public alert: AlertProvider) {

      this.keepConnected = true;
      this.showLoginErrors = false;
      this.showRegisterErrors = false;

	  	this.loginForm = this.formBuilder.group({
	  		username: ['', [Validators.required]],
	  		password: ['', [Validators.required]]
	  	});

  	}

    checkLogin(){

      this.showLoginErrors = this.loginForm.valid;

      if(!this.showLoginErrors){
        this.login();
      }

    }

  	login(){

      this.loading.show();
      let data = this.getLoginFormAsJson();

      this.authenticationProvider.login(data, this.keepConnected).then(
        (data) => {
          this.setViewAndRedirect();
        },
        (err) => {
          this.loading.hide();
          this.alert.show("¡Ups!",err);
        }
      );
  	}

  	setViewAndRedirect(){

  		this.navCtrl.push(TabsPage);
  		this.navCtrl.setRoot(TabsPage);

  	}

    getLoginFormAsJson(){

      let data = {
        'username': this.loginForm.get('username').value,
        'password': this.loginForm.get('password').value
      };

      return data;

    }

    checkboxChanged(event: any){

      if(event.checked){
        this.keepConnected = true;
      }
      else{
        this.keepConnected = false;
      }

    }

}
