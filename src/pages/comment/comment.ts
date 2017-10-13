import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentProvider } from '../../providers/comment/comment';
import { AlertProvider } from '../../providers/alert/alert';
import { Comment } from '../../models/comment';
import { ProfilePage } from '../profile/profile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';

export const PAGE_SIZE = 20;

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
	private commentForm: FormGroup;
	private showFormErrors: boolean;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public commentProvider: CommentProvider,
        public alert: AlertProvider,
        private formBuilder: FormBuilder,
        private loading: LoadingProvider) {

		this.platePictureId = this.navParams.get("platePictureId");
		console.log("PlatePictureId: " + this.platePictureId);

		this.commentsList = [];
		this.page = 0;
		this.newComment = new Comment(null,null,null,null,null,null, null);

		this.showFormErrors = false;

  		this.commentForm = this.formBuilder.group({
  			comment: ['', [Validators.required, Validators.maxLength(150)]]
  		});

  	}

  	/*
		Always executed when the view is ready
  	*/
  	ionViewDidEnter() {
    	
  		this.loadComments();

  	}

  	/*
		Load Comment list for a specific PlatePictureId passed as parameter
  	*/
  	loadComments(){

  		this.commentProvider.getCommentsByPlatePictureId(this.platePictureId, this.page).then(

  			(data) => {

          this.commentsList.length = 0;

  				this.appendComments(data);

				  this.incrementPage(data);

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
      Increment the current query page only if dataLength is equals to PAGE_SIZE constant
    */
    incrementPage(data){
    
    	if(data.length == PAGE_SIZE){
    		this.page = this.page + 1;
    	}

    }

    /*
		Go to the Profile page
    */
    goToProfile(userId){
    	this.navCtrl.push(ProfilePage, {userId: userId});
    }

    /*
		Check if the form is correct and save the new comment
    */
    validateAndSaveComment(){

    	this.showFormErrors = !this.commentForm.valid;

      	if(!this.showFormErrors){
        	
      		this.buildComment();

        	this.saveComment();

      	}

    }

    /*
		Build new Comment
    */
    buildComment(){

    	this.newComment.platePictureId = this.platePictureId;
    	this.newComment.comment = this.commentForm.get("comment").value;

    }

    /*
		Save new comment
    */
    saveComment(){

    	this.commentProvider.saveComment(this.newComment).then(
    		(res) => {

    			this.commentsList.push(res);
    			this.commentForm.reset();

    		},
    		(err) => {
				this.alert.show("¡Ups!", err);  			
    		}
    	);

    }



}
