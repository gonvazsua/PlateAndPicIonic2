import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';

import { IndexPage } from '../pages/index/index';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ChangeProfileDataPage } from '../pages/change-profile-data/change-profile-data';
import { ChangeRestaurantDataPage } from '../pages/change-restaurant-data/change-restaurant-data';
import { ChangeProfilePicturePage } from '../pages/change-profile-picture/change-profile-picture';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';
import { UploadPicturePage } from '../pages/upload-picture/upload-picture';
import { CommentPage } from '../pages/comment/comment';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { PlatePicturePage } from '../pages/plate-picture/plate-picture';
import { SearchRestaurantPage } from '../pages/search-restaurant/search-restaurant';
import { SearchPlatePage } from '../pages/search-plate/search-plate';
import { UserRestaurantPage } from '../pages/user-restaurant/user-restaurant';
import { UserRestaurantPlatePage } from '../pages/user-restaurant-plate/user-restaurant-plate';
import { UserRestaurantTagsPage } from '../pages/user-restaurant-tags/user-restaurant-tags';
import { PlatePage } from '../pages/plate/plate';
import { LegalTextPage } from '../pages/legal-text/legal-text';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PictureServiceProvider } from '../providers/picture-service/picture-service';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { UserProvider } from '../providers/user/user';
import { LoadingProvider } from '../providers/loading/loading';
import { AlertProvider } from '../providers/alert/alert';
import { PlatePictureProvider } from '../providers/plate-picture/plate-picture';
import { CommentProvider } from '../providers/comment/comment';
import { RestaurantProvider } from '../providers/restaurant/restaurant';
import { PlateProvider } from '../providers/plate/plate';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { ApiPlacesProvider } from '../providers/api-places/api-places';
import { UploadImageProvider } from '../providers/upload-image/upload-image';
import { CategoryProvider } from '../providers/categories/categories';
import { CityProvider } from '../providers/city/city';
import { FollowsProvider } from '../providers/follows/follows';
import { HttpProvider } from '../providers/http/http';

@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    LoginPage,
    SignupPage,
    SettingsPage,
    ChangePasswordPage,
    ChangeProfileDataPage,
    ChangeProfilePicturePage,
    ChangeRestaurantDataPage,
    ProfilePage,
    SearchPage,
    UploadPicturePage,
    CommentPage,
    RestaurantPage,
    PlatePicturePage,
    SearchRestaurantPage,
    SearchPlatePage,
    UserRestaurantPage,
    UserRestaurantPlatePage,
    UserRestaurantTagsPage,
    PlatePage,
    LegalTextPage,
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
    ChangePasswordPage,
    ChangeProfileDataPage,
    ChangeProfilePicturePage,
    ChangeRestaurantDataPage,
    ProfilePage,
    SearchPage,
    UploadPicturePage,
    CommentPage,
    RestaurantPage,
    PlatePicturePage,
    SearchRestaurantPage,
    SearchPlatePage,
    UserRestaurantPage,
    UserRestaurantPlatePage,
    UserRestaurantTagsPage,
    PlatePage,
    LegalTextPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    FileTransfer,
    PictureServiceProvider,
    AuthenticationProvider,
    UserProvider,
    LoadingProvider,
    AlertProvider,
    PlatePictureProvider,
    CommentProvider,
    RestaurantProvider,
    PlateProvider,
    GeolocationProvider,
    ApiPlacesProvider,
    UploadImageProvider,
    CategoryProvider,
    CityProvider,
    FollowsProvider,
    HttpProvider
  ]
})
export class AppModule {}
