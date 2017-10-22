export class Restaurant {

	public restaurantId: number;
	public name: string;
	public address: string;
	public phoneNumber: string;
	public registeredOn: string;
	public cityId: number;
	public cityName: string;
	public priceAverage: string;
	public picture: string;
	public description: string;
	public active: boolean;
	public categories: string;
	public latitude: string;
	public longitude: string;
	public apiPlaceId: string;
	public rating: string;

	constructor(){

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			this.restaurantId = data.restaurantId;
			this.name = data.name;
			this.address = data.address;
			this.phoneNumber = data.phoneNumber;
			this.registeredOn = data.registeredOn;
			this.cityId = data.cityId;
			this.cityName = data.cityName;
			this.priceAverage = data.priceAverage;
			this.picture = data.picture;
			this.description = data.description;
			this.active = data.active;
			this.categories = data.categories;
			this.latitude = data.latitude;
			this.longitude = data.longitude;
			this.apiPlaceId = data.apiPlaceId;
			this.rating = data.rating;
		}

	}

	buildFromList(list): Array<Restaurant> {

		let restaurants: Array<Restaurant> = [];
		let restaurant: Restaurant;

		if(list != null && list.length > 0){

			for(let r of list){
				restaurant = new Restaurant();
				restaurant.build(r);
				restaurants.push(restaurant);
			}

		}

		return restaurants;

	}

}