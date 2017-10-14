import { User } from "./user";

export class Plate {

	constructor(
		public plateId: number, 
		public plateName: string, 
		public restaurantId: number,
		public restaurantName: string,
		public plateType: string,
		public plateActive: boolean){

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			//return new Plate(data.plateId, data.name, data.restaurant, data.plateType);
		}

	}

}