export class Follows {

	public userId: number;
	public followersNumber: number;
	public platePicturesNumber: number;
	public isFollowing: boolean;
	public isLoggedUser: boolean;
	public transformedFollowersNumber: string;
	public transformedPlatePicturesNumber: string;

	constructor(){

		this.userId = null;
		this.followersNumber = null;
		this.platePicturesNumber = null;
		this.isFollowing = false;
		this.isLoggedUser = false;

	}

	build(data){

		if(!data){
			return null;
		}
		else {

			this.userId = data.userId;
			this.followersNumber = data.followersNumber;
			this.platePicturesNumber = data.platePicturesNumber;
			this.isFollowing = data.isFollowing;
			this.isLoggedUser = data.isLoggedUser;

		}

	}



    /*
      Transform number from 123456 to 123.4K
    */
    transformNumber(input){

      var decimals = 1;
      var exp, rounded,
          suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

          if(input == null) {
            return 0;
         }

          if(input < 1000) {
            return input;
          }

          exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];

    }

    /*
		Call to a transformNumber function to convert the numbers
    */
	updateTransformationNumber(){

		this.transformedFollowersNumber = this.transformNumber(this.followersNumber);
		this.transformedPlatePicturesNumber = this.transformNumber(this.platePicturesNumber);

	}

}