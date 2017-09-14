import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

	private passwordForm: FormGroup;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		private formBuilder: FormBuilder,
  		public alertCtrl: AlertController) {

  		this.passwordForm = this.formBuilder.group({
  			password1: ['', [Validators.required]],
  			password2: ['', [Validators.required]]
  		});
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ChangePasswordPage');
  	}

  	update(){

  		//Call to update password service

  		this.showSuccessMessage();

  	}

	showSuccessMessage(){

		let alert = this.alertCtrl.create({
      		title: '¡Listo!',
      		subTitle: 'Tus passwords han sido actualizados',
      		buttons: ['OK']
    	});

    	alert.present();

	} 

}
