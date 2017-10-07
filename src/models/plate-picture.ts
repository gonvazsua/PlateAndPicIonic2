export class PlatePicture {

	constructor(
		public platePictureId: number, 
		public title: string,
		public userId: number,
		public username: string,
		public userImage: string,
		public restaurantId: number,
		public restaurantName: string,
		public cityId: number,
		public cityName: string,
		public plateId: number,
		public plateName: string,
		public picture: string,
		public likesNumber: number,
		public commentsNumber: number,
		public likeToUser: boolean,
		public registeredOn: string){

	}

	build(data){

		if(!data){
			return null;
		}
		else{

			return new PlatePicture(data.platePictureId, data.title, data.userId, data.username,
				data.userImage, data.restaurantId, data.restaurantName, data.cityId, data.cityName,
				data.plateId, data.plateName, data.picture, data.likesNumber, data.commentsNumber,
				data.likeToUser, data.registeredOn);
		}

	}

}