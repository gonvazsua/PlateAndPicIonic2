export const ENDPOINT = "http://192.168.1.130:8080";

//LOGIN AND SIGN UP
export const LOGIN_URL = ENDPOINT + "/auth";
export const SIGNUP_URL = ENDPOINT + "/register";

//USER
export const GET_AUTHENTICATED_USER_URL = ENDPOINT + "/user/getAuthenticatedUser";
export const UPDATE_PERSONAL_DATA_URL = ENDPOINT + "/user/updatePersonalData";
export const UPDATE_PASSWORDS_URL = ENDPOINT + "/user/updatePassword";
export const GET_USER_BY_ID = ENDPOINT + "/user/getUserById";
export const FIND_USERS_BY_KEY = ENDPOINT + "/user/findByKey";
export const UPDATE_PROFILE_PICTURE = ENDPOINT + "/user/updateProfilePicture";
export const SAVE_USER_RESTAURANT = ENDPOINT + "/user/saveUserRestaurant";

//FOLLOW
export const GET_FOLLOWERS_BY_USER_ID = ENDPOINT + "/user/followersData";
export const FOLLOW_TO_USER_ID = ENDPOINT + "/user/followToUser";
export const UNFOLLOW_TO_USER_ID = ENDPOINT + "/user/unfollowToUser";

//PLATEPICTURES
export const GET_PLATEPICTURES_BY_USERID = ENDPOINT + "/platePicture/getByUserId";
export const GET_LAST_PLATEPICTURES = ENDPOINT + "/platePicture/lastPlatePictures";
export const GET_PLATEPICTURES_BY_RESTAURANT_ID = ENDPOINT + "/platePicture/getByRestaurant";
export const GET_PLATEPICTURES_BY_PLATE_ID = ENDPOINT + "/platePicture/getByPlate";
export const PLATEPICTURE_LIKE = ENDPOINT + "/platePicture/like";
export const PLATEPICTURE_UNLIKE = ENDPOINT + "/platePicture/unlike";
export const UPLOAD_PLATE_PICTURE = ENDPOINT + "/platePicture/save";
export const GET_PLATEPICTURE_BY_ID = ENDPOINT + "/platePicture/getById";

//COMMENTS
export const GET_COMMENTS_BY_PLATEPICTUREID = ENDPOINT + "/comment/getByPlatePicture";
export const SAVE_COMMENT = ENDPOINT + "/comment/save";

//RESTAURANTS
export const GET_RESTAURANT_BY_ID = ENDPOINT + "/restaurant/getById";
export const GET_RESTAURANT_BY_NAME = ENDPOINT + "/restaurant/getRestaurantsByName";
export const SAVE_RESTAURANT = ENDPOINT + "/restaurant/save";
export const FIND_RESTAURANTS_BY_CITY_AND_CATEGORY = ENDPOINT + "/restaurant/findByCityAndCategory";

//PLATES
export const GET_PLATES_BY_RESTAURANTID = ENDPOINT + "/plate/getPlatesByRestaurant";
export const GET_PLATES_BY_NAME = ENDPOINT + "/plate/findPlatesByName";
export const SAVE_PLATE = ENDPOINT + "/plate/save";

//API-Places
export const GET_API_KEY = "AIzaSyD_WL2_rolCu7nOpAbyDtv-uxdh7ZlIv8Q";
export const GET_API_PLACES_ENDPOINT = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&types=restaurant";

//CATEGORY
export const GET_CATEGORIES_BY_NAME = ENDPOINT + "/category/findByName";

//CITY
export const GET_CITIES_BY_NAME = ENDPOINT + "/city/findByName";