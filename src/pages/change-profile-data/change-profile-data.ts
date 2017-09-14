import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-change-profile-data',
  templateUrl: 'change-profile-data.html',
})
export class ChangeProfileDataPage {

	  private profileDataForm: FormGroup;
    private showFormErrors: boolean;
    private user: User;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public formBuilder: FormBuilder,
  		public alertCtrl: AlertController,
      public userProvider: UserProvider,
      public loading: LoadingProvider) {

      this.showFormErrors = false;
      this.user = new User(null, null, null, null, null, null, null);

  		this.profileDataForm = this.formBuilder.group({
  			username: ['', [Validators.required]],
  			firstname: ['', [Validators.required]],
  			lastname: ['', [Validators.required]],
  			target: ['', [Validators.maxLength(150)]],
  		});

  	}

    ionViewDidLoad() {
      
      this.loading.show();

      this.userProvider.getLoggedUser().then(
        (data) => {
          this.user = this.user.build(data);
          this.loading.hide();
        },
        (err) => {
          this.loading.hide();

        }
      );

    }

    checkUpdate(){

      this.showFormErrors = this.profileDataForm.valid;

      if(!this.showFormErrors){
        this.update();
      }

    }

  	update(){

  		//Call to update user service

  		this.showSuccessMessage();

  	}

	  showSuccessMessage(){

		  let alert = this.alertCtrl.create({
      		title: '¡Listo!',
      		subTitle: 'Tus datos han sido actualizados',
      		buttons: ['OK']
    	});

    	alert.present();

	  }  	

}
