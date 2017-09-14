import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { IndexPage } from '../pages/index/index';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { ChangeEmailPage } from '../pages/change-email/change-email';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ChangeProfileDataPage } from '../pages/change-profile-data/change-profile-data';
import { ChangeProfilePicturePage } from '../pages/change-profile-picture/change-profile-picture';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';
import { UploadPicturePage } from '../pages/upload-picture/upload-picture';
import { CommentPage } from '../pages/comment/comment';
import { RestaurantPage } from '../pages/restaurant/restaurant';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PictureServiceProvider } from '../providers/picture-service/picture-service';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { UserProvider } from '../providers/user/user';
import { LoadingProvider } from '../providers/loading/loading';
import { AlertProvider } from '../providers/alert/alert';

@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    LoginPage,
    SignupPage,
    SettingsPage,
    ChangeEmailPage,
    ChangePasswordPage,
    ChangeProfileDataPage,
    ChangeProfilePicturePage,
    ProfilePage,
    SearchPage,
    UploadPicturePage,
    CommentPage,
    RestaurantPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    LoginPage,
    SignupPage,
    SettingsPage,
    ChangeEmailPage,
    ChangePasswordPage,
    ChangeProfileDataPage,
    ChangeProfilePicturePage,
    ProfilePage,
    SearchPage,
    UploadPicturePage,
    CommentPage,
    RestaurantPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PictureServiceProvider,
    AuthenticationProvider,
    UserProvider,
    LoadingProvider,
    AlertProvider
  ]
})
export class AppModule {}
