export class PlatePicture {

	public platePictureId: number; 
	public title: string;
	public userId: number;
	public username: string;
	public userImage: string;
	public restaurantId: number;
	public restaurantName: string;
	public cityId: number;
	public cityName: string;
	public plateId: number;
	public plateName: string;
	public plateActive: boolean;
	public picture: string;
	public likesNumber: number;
	public commentsNumber: number;
	public likeToUser: boolean;
	public registeredOn: string;

	constructor(){

	}

	build(data){

		if(!data){
			return null;
		}
		else{

			this.platePictureId = data.platePictureId;
			this.title = data.title;
			this.userId = data.userId;
			this.username = data.username;
			this.userImage = data.userImage;
			this.restaurantId = data.restaurantId;
			this.restaurantName = data.restaurantName;
			this.cityId = data.cityId;
			this.cityName = data.cityName
			this.plateId = data.plateId;
			this.plateName = data.plateName;
			this.plateActive = data.plateActive
			this.picture = data.picture;
			this.likesNumber = data.likesNumber;
			this.commentsNumber = data.commentsNumber;
			this.likeToUser = data.likeToUser;
			this.registeredOn = data.registeredOn;

		}

	}

	buildFromList(list): Array<PlatePicture> {

		let platePictures: Array<PlatePicture> = [];
		let platePicture: PlatePicture;

		if(list != null && list.length > 0){

			for(let pp of list){
				platePicture = new PlatePicture();
				platePicture.build(pp);
				platePictures.push(platePicture);
			}

		}

		return platePictures;

	}

}