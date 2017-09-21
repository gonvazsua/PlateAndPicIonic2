import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

	  private passwordForm: FormGroup;
    private showFormErrors: boolean;

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		private formBuilder: FormBuilder,
      public userProvider: UserProvider,
      public loading: LoadingProvider,
      public alert: AlertProvider) {

      this.showFormErrors = false;

  		this.passwordForm = this.formBuilder.group({
  			currentPassword: ['', [Validators.required, Validators.maxLength(20)]],
        password1: ['', [Validators.required, Validators.maxLength(20)]],
  			password2: ['', [Validators.required, Validators.maxLength(20)]]
  		}, {
        validator: this.matchingPasswords('password1', 'password2')
      });
  	}

    matchingPasswords(passwordKey: string, confirmPasswordKey: string){

      return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
          this.passwordForm.setErrors({"mismatchedPasswords": true});
          return {"mismatchedPasswords": true};
        }
      }

    }

    validateAndUpdate(){

      this.showFormErrors = !this.passwordForm.valid;

      if(!this.showFormErrors){
        this.update();
      }

    }


  	update(){

  	  this.loading.show();

      let lastPassword = this.passwordForm.get('currentPassword').value;
      let password1 = this.passwordForm.get('password1').value;
      let password2 = this.passwordForm.get('password2').value;

      this.userProvider.updatePassword(lastPassword, password1, password2).then(
        (success) => {
          this.loading.hide();
          this.alert.show('¡Bien!', 'Tu contraseña ha sido actualizada');
        },
        (err) => {
          this.loading.hide();
          this.alert.show("¡Ups!",err);
        }
      );


  	}


}
