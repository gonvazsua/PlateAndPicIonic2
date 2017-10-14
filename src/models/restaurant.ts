import { ApiPlace } from '../models/api-place';

export class Restaurant {

	constructor(
		public restaurantId: number,
		public name: string,
		public address: string,
		public phoneNumber: string,
		public registeredOn: string,
		public cityId: number,
		public cityName: string,
		public priceAverage: string,
		public picture: string,
		public description: string,
		public active: boolean,
		public categories: string){

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			return new Restaurant(data.restaurantId, data.name, data.address, data.phoneNumber,
				data.registeredOn, data.cityId, data.cityName, data.priceAverage, data.picture,
				data.description, data.active, data.categories);
		}

	}

	buildFromApiPlace(apiPlace: ApiPlace){

		this.restaurantId = null;
		this.name = apiPlace.name;
		this.extractAddressAndCityFromVicinity(apiPlace.vicinity);
		this.phoneNumber = null;
		this.registeredOn = null;
		this.cityId = null;
		this.priceAverage = null;
		this.picture = null;
		this.description = null;
		this.active = true;
		this.categories = null;

	}

	/*
		Set the address and the cityName from the vicinity field:
		Format: Calle de Claudio Coello, 1, Madrid
	*/
	private extractAddressAndCityFromVicinity(vicinity){

		let data:Array<string> = vicinity.split(',');
		let address = "";
		let cityName = "";

		for(let i = 0; i < data.length; i++){

			if(i == (data.length -1)){
				cityName = data[i];
			}
			else{
				address = address + data[i];
			}

		}	

		this.address = address;
		this.cityName = cityName;

	}

}