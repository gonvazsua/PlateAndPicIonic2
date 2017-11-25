import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { IndexPage } from '../pages/index/index';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;

  constructor(
      platform: Platform, statusBar: StatusBar, 
      splashScreen: SplashScreen, authProvider: AuthenticationProvider) {
    
      splashScreen.hide();

      //Check user is authenticated
      authProvider.checkAuthentication().then(
          (success) => {
            this.rootPage = TabsPage;
          },
          (err) => {
            console.log("user not logged in");
            this.rootPage = IndexPage;  
          }
        );

      platform.ready().then(() => {

        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();

      });
  }

}
