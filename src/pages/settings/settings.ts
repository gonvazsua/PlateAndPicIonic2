import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangeProfilePicturePage } from '../change-profile-picture/change-profile-picture';
import { ChangePasswordPage } from '../change-password/change-password';
import { ChangeProfileDataPage } from '../change-profile-data/change-profile-data';
import { IndexPage } from '../index/index';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  goToUpdateProfilePicture(){
  	this.navCtrl.push(ChangeProfilePicturePage);
  }

  goToUpdateProfileData(){
  	this.navCtrl.push(ChangeProfileDataPage);
  }

  goToUpdatePassword(){
  	this.navCtrl.push(ChangePasswordPage);
  }

  goToLogout(){
    
    this.authProvider.logout().then(
      (success) => {
        this.navCtrl.setRoot(IndexPage);
        window.location.reload();
      },
      (error) => {
        console.log("Error logging out");
      }
    );
  }

}
