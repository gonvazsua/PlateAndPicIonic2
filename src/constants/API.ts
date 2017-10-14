export const ENDPOINT = "http://localhost:8080";

//LOGIN
export const LOGIN_URL = ENDPOINT + "/auth";

//USER
export const GET_AUTHENTICATED_USER_URL = ENDPOINT + "/user/getAuthenticatedUser";
export const UPDATE_PERSONAL_DATA_URL = ENDPOINT + "/user/updatePersonalData";
export const UPDATE_PASSWORDS_URL = ENDPOINT + "/user/updatePassword";
export const GET_USER_BY_ID = ENDPOINT + "/user/getUserById";

//PLATEPICTURES
export const GET_PLATEPICTURES_BY_USERNAME = ENDPOINT + "/platePicture/getByUsername";
export const GET_LAST_PLATEPICTURES = ENDPOINT + "/platePicture/lastPlatePictures";
export const GET_PLATEPICTURES_BY_RESTAURANT_ID = ENDPOINT + "/platePicture/getByRestaurant";
export const GET_PLATEPICTURES_BY_PLATE_ID = ENDPOINT + "/platePicture/getByPlate";
export const PLATEPICTURE_LIKE = ENDPOINT + "/platePicture/like";
export const PLATEPICTURE_UNLIKE = ENDPOINT + "/platePicture/unlike";

//COMMENTS
export const GET_COMMENTS_BY_PLATEPICTUREID = ENDPOINT + "/comment/getByPlatePicture";
export const SAVE_COMMENT = ENDPOINT + "/comment/save";

//RESTAURANTS
export const GET_RESTAURANT_BY_ID = ENDPOINT + "/restaurant/getById";
export const GET_RESTAURANT_BY_NAME = ENDPOINT + "/restaurant/getRestaurantsByName";

//PLATES
export const GET_PLATES_BY_RESTAURANTID = ENDPOINT + "/plate/getPlatesByRestaurant";