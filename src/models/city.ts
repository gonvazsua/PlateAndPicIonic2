export class City {

	public cityId: number;
	public cityName: string;
	public provinceId: number;
	public provinceName: string;

	constructor(){

		this.cityId = 0;
		this.cityName = "";
		this.provinceId = 0;
		this.provinceName = "";

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			this.cityId = data.cityId;
			this.cityName = data.cityName;
			this.provinceId = data.provinceId;
			this.provinceName = data.provinceName;

		}

	}

	buildFromList(list){

		let city = null;
		let cityList: Array<City> = [];

		for(let c of list){

			city = new City();
			city.build(c);

			cityList.push(city);

		}

		return cityList;

	}

}