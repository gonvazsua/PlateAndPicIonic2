import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';

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
      public userProvider: UserProvider,
      public loading: LoadingProvider,
      public alert: AlertProvider) {

      this.showFormErrors = false;
      this.user = new User();

  		this.profileDataForm = this.formBuilder.group({
  			username: ['', [Validators.required, Validators.maxLength(50)]],
  			firstname: ['', [Validators.required, Validators.maxLength(50)]],
  			lastname: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
  			target: ['', [Validators.maxLength(150)]],
  		});

  	}

    ionViewDidLoad() {
      
      this.loading.show();

      this.userProvider.getLoggedUser().then(
        (data) => {
          this.user.build(data);
          this.loading.hide();
        },
        (err) => {
          this.loading.hide();

        }
      );

    }

    checkUpdate(){

      this.showFormErrors = !this.profileDataForm.valid;

      if(!this.showFormErrors){
        this.update();
      }

    }

  	update(){

  		this.loading.show();

      this.updateUserValues();

      this.userProvider.updatePersonalData(this.user).then(
        (success) => {
          this.loading.hide();
          this.alert.show('¡Bien!', 'Tus datos han sido actualizados');
        },
        (err) => {
          this.loading.hide();
          this.alert.show("¡Ups!",err);
        }
      );

  	}

    updateUserValues(){

      this.user.firstname = this.profileDataForm.get("firstname").value;
      this.user.lastname = this.profileDataForm.get("lastname").value;
      this.user.username = this.profileDataForm.get("username").value;
      this.user.email = this.profileDataForm.get("email").value;
      this.user.target = this.profileDataForm.get("target").value;

    }

}
