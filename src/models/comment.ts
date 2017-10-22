export class Comment {

	public commentId: number; 
	public comment: string;
	public userId: number;
	public username: string;
	public userImage: string;
	public platePictureId: number;
	public registeredOn: string;

	constructor(){

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			this.commentId = data.commentId;
			this.comment = data.comment;
			this.userId = data.userId;
			this.username = data.username;
			this.userImage = data.userImage;
			this.platePictureId = data.platePictureId;
			this.registeredOn = data.registeredOn;
		}

	}

	buildFromList(list): Array<Comment> {

		let comments: Array<Comment> = [];
		let comment: Comment;

		if(list != null && list.length > 0){

			for(let c of list){
				comment = new Comment();
				comment.build(c);
				comments.push(comment);
			}

		}

		return comments;

	}

}