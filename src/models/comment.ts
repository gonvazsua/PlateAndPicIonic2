export class Comment {

	constructor(
		private commentId: number, 
		private comment: string, 
		private userId: number,
		private username: string,
		private userImage: string,
		private registeredOn: string){

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			return new Comment(data.commentId, data.comment, data.userId, data.username,
				data.userImage, data.registeredOn);
		}

	}

}