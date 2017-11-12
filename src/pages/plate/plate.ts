import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Plate } from '../../models/plate';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import * as Constants from '../../constants/API';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-plate',
  templateUrl: 'plate.html',
})
export class PlatePage {

	private plate: Plate;
	private plateForm: FormGroup;
	private plateActive: boolean;

  	constructor(public navCtrl: NavController, public navParams: NavParams,
  		public httpProvider: HttpProvider, public loading: LoadingProvider,
  		public alert: AlertProvider, public formBuilder: FormBuilder) {
  		
  		this.plate = new Plate();

  		this.plateForm = this.formBuilder.group({
	  		name: ['', [Validators.required, Validators.maxLength(50)]]
	  	});

  	}

  	/*
		Call to load plate. If the plate passed as parameter is null, it means that
		is a new plate
  	*/
  	ionViewDidEnter() {

  		this.plate = this.navParams.get("plate");

  		if(this.plate == null) {

  			this.plate = new Plate();

  		} else {

  			this.plateActive = this.plate.plateActive;

  		}
    
  	}

  	/*
		Save the plate
  	*/
  	savePlate(){

  		this.loading.show();

  		this.httpProvider.post(Constants.SAVE_PLATE, this.plate).then(

  			(data) => {

  				this.loading.hide();
  				this.navCtrl.pop();

  			},
  			(err) => {
  				console.log("There was an error saving the plate: " + err);
  				this.loading.hide();
  				this.alert.show("¡Ups!", err);
  			}

  		);

  	}

  	/*
		Validate and save the plate form
  	*/
  	validateAndSave(){

  		if(this.plateForm.valid){

  			this.plate.plateName = this.plateForm.get("name").value;
  			this.plate.plateActive = this.plateActive;
  			this.savePlate();

  		}

  	}

  	updateActive(){
  		this.plateActive = !this.plateActive;
  	}

}
