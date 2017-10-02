export class PlatePicture {

	constructor(
		private platePictureId: number, 
		private title: string,
		private userId: number,
		private username: string,
		private userImage: string,
		private restaurantId: number,
		private restaurantName: string,
		private cityId: number,
		private cityName: string,
		private plateId: number,
		private plateName: string,
		private picture: string,
		private likesNumber: number,
		private commentsNumber: number,
		private likeToUser: boolean,
		private registeredOn: string){

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