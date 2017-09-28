import { User } from "./user";

export class Plate {

	constructor(
		public plateId: number, 
		public name: string, 
		public plateType: string){

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