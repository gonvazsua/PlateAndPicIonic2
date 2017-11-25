import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  
  }

  goToLogin(){
  	this.navCtrl.push(LoginPage);
  }

  goToSignUp(){
  	this.navCtrl.push(SignupPage);	
  }

}
