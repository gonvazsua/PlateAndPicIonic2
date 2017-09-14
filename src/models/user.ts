export class User {

	constructor(
		public userId: number,
		public firstname: string,
		public lastname: string,
		public username: string,
		public email: string,
		public picture: string,
		public target: string){

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			return new User(data.userId, data.firstname, data.lastname, data.username, data.email, 
				data.picture, data.target);
		}

	}

}