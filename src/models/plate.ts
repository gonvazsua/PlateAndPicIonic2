import { User } from "./user";

export class Plate {

	public plateId: number; 
	public plateName: string; 
	public restaurantId: number;
	public restaurantName: string;
	public plateType: string;
	public plateActive: boolean;

	constructor(){

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			this.plateId = data.plateId;
			this.plateName = data.plateName;
			this.restaurantId = data.restaurantId;
			this.restaurantName = data.restaurantName;
			this.plateType = data.plateType;
			this.plateActive = data.plateActive;
		}

	}

	buildFromList(list): Array<Plate> {

		let plates: Array<Plate> = [];
		let plate: Plate;

		if(list != null && list.length > 0){

			for(let p of list){
				plate = new Plate();
				plate.build(p);
				plates.push(plate);
			}

		}

		return plates;

	}

}