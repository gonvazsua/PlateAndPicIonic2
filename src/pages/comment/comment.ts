import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentProvider } from '../../providers/comment/comment';
import { AlertProvider } from '../../providers/alert/alert';
import { Comment } from '../../models/comment';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

	private platePictureId: number;
	private commentsList: Array<Object>;
	private page: number;
	private newComment: Comment;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public commentProvider: CommentProvider,
        public alert: AlertProvider) {

		this.platePictureId = this.navParams.get("platePictureId");
		console.log("PlatePictureId: " + this.platePictureId);

		this.commentsList = [];
		this.page = 0;
		this.newComment = new Comment(null,null,null,null,null,null);

  	}

  	ionViewDidEnter() {
    	
  		this.loadComments();

  	}

  	/*
		Load Comment list for a specific PlatePictureId passed as parameter
  	*/
  	loadComments(){

  		this.commentProvider.getCommentsByPlatePictureId(this.platePictureId, this.page).then(

  			(data) => {

  				this.appendComments(data);

		        if(data){
		        	this.incrementPage();
		        }

  			},
  			(err) => {
  				this.page = 0;
		        console.log("Error in loadComments" + err);
		        this.alert.show("¡Ups!",err);
  			}

  		);

  	}

  	/*
      Push a commentsListRes into commentsList array
    */
    appendComments(commentsListRes){

      for(let comment of commentsListRes){
        this.commentsList.push(comment);
      }

    }

    /*
      Increment the current query page
    */
    incrementPage(){
      this.page = this.page + 1;
    }

}
