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

}