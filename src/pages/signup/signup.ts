import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	signUpForm: FormGroup;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public formBuilder: FormBuilder
  	) {

  	this.signUpForm = this.formBuilder.group({
  		username: ['', [Validators.required]],
  		email: ['', [Validators.required, Validators.email]],
  		password: ['', [Validators.required, Validators.minLength(4)]],
  		repeatPassword: ['', [Validators.required, Validators.minLength(4)]]
  	});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp(){

  	//Call to Signup service

  	this.navCtrl.push(TabsPage);
  	this.navCtrl.setRoot(TabsPage);

  }

}
