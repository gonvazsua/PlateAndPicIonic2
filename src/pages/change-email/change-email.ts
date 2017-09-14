import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-change-email',
  templateUrl: 'change-email.html',
})
export class ChangeEmailPage {

	public emailForm: FormGroup;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public formBuilder: FormBuilder,
  		public alertCtrl: AlertController) {
  		
  		this.emailForm = this.formBuilder.group({
  			email: ['', [Validators.required]]
  		});
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ChangeEmailPage');
  	}

  	update(){

  		//Call to update email service

  		this.showSuccessMessage();

  	}

	showSuccessMessage(){

		let alert = this.alertCtrl.create({
      		title: '¡Listo!',
      		subTitle: 'Tu email ha sido actualizado',
      		buttons: ['OK']
    	});

    	alert.present();

	}

}
