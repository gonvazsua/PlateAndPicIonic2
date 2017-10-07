import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import * as Constants from '../../constants/API';
import { Comment } from '../../models/comment';

@Injectable()
export class CommentProvider {

	private newComment: Comment;

  	constructor(public http: Http, public storage: Storage) {

  		this.newComment = new Comment(null,null,null,null,null,null, null);
    
  	}

  	/*
		Return promise with a Comment list of the platePictureId passed as parameter
  	*/
  	getCommentsByPlatePictureId(platePictureId, page){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let params: URLSearchParams = new URLSearchParams();
	  				let requestOptions = new RequestOptions();
	  				let headers = new Headers();

			  		headers.append('Authorization', token);
			  		params.set('platePictureId', platePictureId);
			  		params.set('page', page);
		
			  		requestOptions.headers = headers;
	  				requestOptions.params = params;

			  		this.http.get(Constants.GET_COMMENTS_BY_PLATEPICTUREID, requestOptions).subscribe(
			  			res => {
			  				resolve(this.buildCommentList(res.json()));
			  			},
			  			(err) => {
			  				reject(err._body);
			  			}
			  		);
	  			},
	  			(err) => {
	  				reject("Ha ocurrido un problema");
	  			}
  			);

  		});

  	}

  	/*
		Save new Comment with platePicture and text
  	*/
  	saveComment(comment){

  		return new Promise((resolve, reject) => {

  			this.storage.get('token').then(
	  			(token) => {

	  				let headers = new Headers();
		  			headers.append('Content-Type', 'application/json');
		  			headers.append('Authorization', token);

		  			this.http.post(Constants.SAVE_COMMENT, JSON.stringify(comment), {headers: headers})
		  				.subscribe(
		  					res => {

		  						this.newComment = this.newComment.build(res.json());
		  						resolve(this.newComment);

		  					},
		  					(err) => {
		              			reject(err._body);
		  					}
		  				);

	  			},
	  			(err) => {
	  				reject("Ha ocurrido un problema");
	  			}
  			);

  		});

  	}

  	/*
		Build a Comment object list from response body
  	*/
  	buildCommentList(jsonList): Array<Comment>{

  		let commentList: Array<Comment>;
  		let comment: Comment;

  		commentList = [];

  		for(let c of jsonList){

  			comment = new Comment(c.commentId, c.comment, c.userId, c.username, c.userImage, 
  				c.platePictureId, c.registeredOn);
  			commentList.push(c);

  		}

  		return commentList;

  	}

}
