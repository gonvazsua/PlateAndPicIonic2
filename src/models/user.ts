export class User {

	public userId: number;
	public firstname: string;
	public lastname: string;
	public username: string;
	public email: string;
	public picture: string;
	public target: string;
	public restaurantId: number;

	constructor(){

		this.userId = 0;
		this.firstname = "";
		this.lastname = "";
		this.username = "";
		this.email = "";
		this.picture = "";
		this.target = "";
		this.restaurantId = 0;

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			this.userId = data.userId;
			this.firstname = data.firstname;
			this.lastname = data.lastname;
			this.username = data.username;
			this.email = data.email; 
			this.picture = data.picture;
			this.target = data.target;
			this.restaurantId = data.restaurantId;
		}

	}

	buildFromList(list): Array<User> {

		let users: Array<User> = [];
		let user: User;

		if(list != null && list.length > 0){

			for(let u of list){
				user = new User();
				user.build(u);
				users.push(user);
			}

		}

		return users;

	}

}