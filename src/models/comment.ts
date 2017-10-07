export class Comment {

	constructor(
		public commentId: number, 
		public comment: string, 
		public userId: number,
		public username: string,
		public userImage: string,
		public platePictureId: number,
		public registeredOn: string){

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			return new Comment(data.commentId, data.comment, data.userId, data.username,
				data.userImage, data.platePictureId, data.registeredOn);
		}

	}

}