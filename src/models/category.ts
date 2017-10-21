export class Category {

	public categoryId: number;
	public categoryName: string;

	constructor(){

		this.categoryId = 0;
		this.categoryName = "";

	}

	build(data){

		if(!data){
			return null;
		}
		else{
			
			this.categoryId = data.categoryId;
			this.categoryName = data.categoryName;

		}

	}

	buildFromList(list){

		let category = null;
		let categoryList: Array<Category> = [];

		for(let c of list){

			category = new Category();
			category.build(c);

			categoryList.push(category);

		}

		return categoryList;

	}

}