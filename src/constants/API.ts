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