import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthenticationProvider) {
  
  }

  ionViewDidLoad() {
    this.checkUserLogged();
  }

  goToLogin(){
  	this.navCtrl.push(LoginPage);
  }

  goToSignUp(){
  	this.navCtrl.push(SignupPage);	
  }

  goToHome(){
    this.navCtrl.setRoot(TabsPage);
  }

  checkUserLogged(){

    this.authProvider.checkAuthentication().then(
      (success) => {
        this.goToHome();
      },
      (err) => {
        console.log("user not logged in");    
      }
    );

  }

}
