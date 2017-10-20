export const ENDPOINT = "http://192.168.1.133:8080";

//LOGIN
export const LOGIN_URL = ENDPOINT + "/auth";

//USER
export const GET_AUTHENTICATED_USER_URL = ENDPOINT + "/user/getAuthenticatedUser";
export const UPDATE_PERSONAL_DATA_URL = ENDPOINT + "/user/updatePersonalData";
export const UPDATE_PASSWORDS_URL = ENDPOINT + "/user/updatePassword";
export const GET_USER_BY_ID = ENDPOINT + "/user/getUserById";
export const FIND_USERS_BY_KEY = ENDPOINT + "/user/findByKey";
export const UPDATE_PROFILE_PICTURE = ENDPOINT + "/user/updateProfilePicture";

//PLATEPICTURES
export const GET_PLATEPICTURES_BY_USERNAME = ENDPOINT + "/platePicture/getByUsername";
export const GET_LAST_PLATEPICTURES = ENDPOINT + "/platePicture/lastPlatePictures";
export const GET_PLATEPICTURES_BY_RESTAURANT_ID = ENDPOINT + "/platePicture/getByRestaurant";
export const GET_PLATEPICTURES_BY_PLATE_ID = ENDPOINT + "/platePicture/getByPlate";
export const PLATEPICTURE_LIKE = ENDPOINT + "/platePicture/like";
export const PLATEPICTURE_UNLIKE = ENDPOINT + "/platePicture/unlike";
export const UPLOAD_PLATE_PICTURE = ENDPOINT + "/platePicture/save";

//COMMENTS
export const GET_COMMENTS_BY_PLATEPICTUREID = ENDPOINT + "/comment/getByPlatePicture";
export const SAVE_COMMENT = ENDPOINT + "/comment/save";

//RESTAURANTS
export const GET_RESTAURANT_BY_ID = ENDPOINT + "/restaurant/getById";
export const GET_RESTAURANT_BY_NAME = ENDPOINT + "/restaurant/getRestaurantsByName";
export const SAVE_RESTAURANT = ENDPOINT + "/restaurant/save";

//PLATES
export const GET_PLATES_BY_RESTAURANTID = ENDPOINT + "/plate/getPlatesByRestaurant";
export const GET_PLATES_BY_NAME = ENDPOINT + "/plate/findPlatesByName";

//API-Places
export const GET_API_KEY = "AIzaSyD_WL2_rolCu7nOpAbyDtv-uxdh7ZlIv8Q";
export const GET_API_PLACES_ENDPOINT = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&types=restaurant";