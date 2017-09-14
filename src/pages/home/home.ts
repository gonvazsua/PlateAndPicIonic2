import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { RestaurantPage } from '../restaurant/restaurant';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	constructor(public navCtrl: NavController) {

  	}

  	goToComments(){
  		this.navCtrl.push(CommentPage);
  	}

  	goToRestaurant(){
  		this.navCtrl.push(RestaurantPage);
  	}

}
