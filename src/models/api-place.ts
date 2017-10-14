export class ApiPlace {

	constructor(
		public latitude: string,
		public longitude: string,
		public name: string,
		public vicinity: string,
		public placeId: string,
		public rating: number){

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			this.latitude = data.geometry.location.lat;
			this.longitude = data.geometry.location.lng;
			this.name = data.name;
			this.placeId = data.place_id;
			this.rating = data.rating;
			this.vicinity = data.vicinity;
			
		}

	}

}